<template>
  <v-container fluid class="pt-0">

    <!--CATEGORY TABS-->

    <loading v-if="loading"></loading>

    <template v-else>

      <v-tabs v-model="tab" cols="12" :class="{'my-2': !dense }">
        <v-tab v-for="category in getCategories" :key="category.id">
          {{ category.name }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">

        <v-tab-item v-for="category in getCategories" :key="category.id">
          <v-row>
            <v-col v-for="product in getProductsByCategory(category)"
                   :key="product.id"
                   cols="12" sm="6" md="6" lg="6"
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
        </v-tab-item>
      </v-tabs-items>


    </template>

  </v-container>
</template>

<script>
import ProductProvider from "@/modules/delivery/providers/ProductProvider";
import {Loading} from "@dracul/common-frontend"
import ProductCard from "@/modules/delivery/components/ProductCard/ProductCard";
import ProductCardDense from "@/modules/delivery/components/ProductCardDense/ProductCarDense";

export default {
  name: "ProductGalleryTabs",
  components: {ProductCardDense, ProductCard,  Loading},
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
      loading: false,
      tab: 0
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
