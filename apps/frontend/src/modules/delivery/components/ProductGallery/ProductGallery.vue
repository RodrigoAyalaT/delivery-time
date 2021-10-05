<template>
  <v-container fluid class="pt-0">
  <v-row>
    <v-col v-if="!dense" cols="12" sm="4" md="3" style="border-right: 1px solid lightgray" >

      <v-row class="py-0 " >
        <!--FILTER-->
        <v-col cols="12" >
          <product-filters
              v-model="filters"
              @input="fetchProducts"
              vertical
          />
        </v-col>

        <!--CART-->
        <v-col
            v-if="$vuetify.breakpoint.smAndUp"
            cols="12" class="pb-0"
        >
          <cart-detail
              :items="getOrderItems"
              @clearOrder="$store.commit('clearOrderItems')"
              :quantity-total="$store.getters.getQuantityTotal"
              :delivery-cost="$store.getters.getDeliveryCost"
              :amount-products="$store.getters.getAmountProducts"
              :amount-total="$store.getters.getAmountTotal"
          ></cart-detail>
        </v-col>
      </v-row>


    </v-col>

    <!--PRODUCTS-->
    <v-col cols="12" sm="8" :md="dense?12:9" class="pt-0">

      <loading v-if="loading"></loading>

      <template v-else-if="products.length === 0">
        <v-alert type="info">
          No se encontraron productos con los criterios seleccionados
        </v-alert>
      </template>

      <template v-else>
        <v-row :dense="dense" v-for="category in getCategories" :key="category.id">
          <div v-if="$vuetify.breakpoint.smAndUp"
              :style="{position: 'absolute', top: '10px', right: '10px'}">
            <gallery-view-buttons></gallery-view-buttons>
          </div>
          <v-col cols="12" :class="{'my-2': !dense }">
            <section :id="category.name">
              <h6 v-if="dense" class="text-h6 grey--text text--darken-3">{{ category.name }}</h6>
              <h5 v-else class="text-h5 grey--text text--darken-3">{{ category.name }}</h5>
            </section>
            <v-divider></v-divider>
          </v-col>
          <v-col v-for="product in getProductsByCategory(category)"
                 :key="product.id"
                 cols="12" :sm="$store.getters.getGalleryView"
          >
            <product-card-dense
                v-if="dense"
                :product="product"
                :quantity="$store.getters.getQuantity(product)"
                edit-quantity
            />

            <product-card
                v-else
                :product="product"
                :quantity="$store.getters.getQuantity(product)"
                edit-quantity
            />
          </v-col>
        </v-row>
      </template>

    </v-col>


  </v-row>
  </v-container>
</template>

<script>
import ProductProvider from "@/modules/delivery/providers/ProductProvider";
import ProductFilters from "@/modules/delivery/components/ProductFilters/ProductFilters";
import CartDetail from "@/modules/delivery/components/CartDetail/CartDetail";
import {Loading} from "@dracul/common-frontend"
import ProductCard from "@/modules/delivery/components/ProductCard/ProductCard";
import ProductCardDense from "@/modules/delivery/components/ProductCardDense/ProductCarDense";
import GalleryViewButtons from "@/modules/delivery/components/GalleryViewButtons/GalleryViewButtons";

export default {
  name: "ProductGallery",
  components: {GalleryViewButtons, ProductCardDense, ProductCard, CartDetail, ProductFilters,Loading},
  props: {
    dense: {type: Boolean, default: false}
  },
  data() {
    return {
      products: [],
      categories: [],
      filters: {
        name: null,
        ingredients: [],
        category: null
      },
      loading: false
    }
  },
  created() {
    this.$store.dispatch('fetchCategories')
    this.fetchProducts()
  },
  computed: {
    getCategoriesMenu() {
      return this.$store.getters.getCategories.map(category => {
        return category.name
      })
    },
    getOrder() {
      return this.$store.state.delivery.order
    },
    getOrderItems() {
      return this.$store.state.delivery.order.items
    },
    getQuantity() {
      return (product) => {
        let item = this.order.items.find(p => p.product.id === product.id)
        if (item) {
          return item.quantity
        }
        return 0
      }
    },
    getTotalItems() {
      return this.order.items.reduce((a, v) => a + v.quantity, 0)
    },
    getCategories() {
      if (this.filters.category) {
        return this.$store.getters.getCategories.filter(c => c.id === this.filters.category)
      }
      return this.$store.getters.getCategories
    },
    getProductsByCategory() {
      return category => {
        return this.products.filter(p => p.category.id === category.id)
      }
    }
  },
  methods: {

    fetchProducts() {
      this.loading = true
      ProductProvider.fetchProductsFiltered(this.filters)
          .then(r => {
            this.products = r.data.productFetchFiltered
          })
          .catch(e => {
            console.error(e)
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>

<style scoped>

</style>
