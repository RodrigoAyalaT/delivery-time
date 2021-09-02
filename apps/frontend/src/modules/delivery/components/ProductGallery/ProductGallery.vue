<template>
  <v-container fluid>
  <v-row>
    <v-col cols="12" sm="4" md="3" style="border-right: 1px solid lightgray" >

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
              @addProduct="addProduct"
              @removeProduct="removeProduct"
              @clearOrder="$store.commit('clearOrderItems')"
              :quantity-total="$store.getters.getQuantityTotal"
              :amount-total="$store.getters.getAmountTotal"

          ></cart-detail>
        </v-col>
      </v-row>


    </v-col>

    <!--PRODUCTS-->
    <v-col cols="12" sm="8" md="9" class="pt-0">

      <loading v-if="loading"></loading>

      <template v-else-if="products.length === 0">
        <v-alert type="info">
          No se encontraron productos con los criterios seleccionados
        </v-alert>
      </template>

      <template v-else>
        <v-row v-for="category in getCategories" :key="category.id">

          <v-col cols="12" class="my-2">
            <section :id="category.name">
              <h5 class="text-h5 grey--text text--darken-3">{{ category.name }}</h5>
            </section>
            <v-divider></v-divider>
          </v-col>
          <v-col v-for="product in getProductsByCategory(category)"
                 :key="product.id"
                 cols="12" sm="6" md="6" lg="6"
          >
            <product-card
                :product="product"
                :quantity="$store.getters.getQuantity(product)"
                @addProduct="addProduct"
                @removeProduct="removeProduct"
                edit-quantity
            ></product-card>
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
import ProductCard from "@/modules/delivery/components/ProductCard/ProductCard";
import {Loading} from "@dracul/common-frontend"

export default {
  name: "ProductGallery",
  components: {ProductCard, CartDetail, ProductFilters,Loading},
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
    addProduct(product) {
      this.$store.commit('addOrderItem', product)
    },
    removeProduct(product) {
      this.$store.commit('removeOrderItem', product)
    },
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
