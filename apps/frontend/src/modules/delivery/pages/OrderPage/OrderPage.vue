<template>
  <v-container fluid>
    <cart-button :total="$store.getters.getQuantityTotal" @click="showOrder=!showOrder"></cart-button>
    <v-row>

      <!--STEPPER-->
      <v-col cols="12">
        <v-stepper v-model="step" non-linear>
          <v-stepper-header>

            <v-stepper-step
                editable
                :step="1"
                complete-icon="inventory_2"
                edit-icon="inventory_2"
            >
              Entrega
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                editable
                :step="2"
                complete-icon="inventory_2"
                edit-icon="inventory_2"
            >
              Productos
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :step="3"
                editable
                complete-icon="place"
            >
              Dirección

            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :step="4"
                editable
                complete-icon="call"
            >
              Contacto
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :step="5"
                editable
                complete-icon="done"
            >
              Confirmar
            </v-stepper-step>

          </v-stepper-header>
        </v-stepper>
      </v-col>


      <v-col cols="12">
        <v-stepper v-model="step" >
            <div :style="{border:'none', shadow: 'none'}"  :step="1" class="pa-0">
              <delivery-mode></delivery-mode>
            </div>

            <v-stepper-content :step="2" class="py-0">
              <!--PRODUCTS-->
              <v-row>
                <v-col cols="12" sm="4" md="3">
                  <product-filters
                      v-model="filters"
                      @input="fetchProducts"
                      vertical
                  />
                  <cart-detail
                      v-if="$vuetify.breakpoint.smAndUp" cols="12" sm="12" md="12"
                      :items="getOrderItems"
                      @addProduct="addProduct"
                      @removeProduct="removeProduct"
                      @clearOrder="$store.commit('clearOrder')"
                      :quantity-total="$store.getters.getQuantityTotal"
                      :amount-total="$store.getters.getAmountTotal"

                  ></cart-detail>

                </v-col>

                <v-col cols="12" sm="8" md="9">
                  <v-row v-for="category in getCategories" :key="category.id">
                    <v-col cols="12" class="my-2">
                      <h5 class="text-h5">{{ category.name }}</h5>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col v-for="product in getProductsByCategory(category)"
                           :key="product.id"
                           cols="12" sm="6" md="4"
                           class=""
                    >
                      <product-card
                          :product="product"
                          :quantity="$store.getters.getQuantity(product)"
                          @addProduct="addProduct"
                          @removeProduct="removeProduct"
                      ></product-card>
                    </v-col>
                  </v-row>
                </v-col>


              </v-row>
            </v-stepper-content>

            <v-stepper-content :step="3" class="white">
              <location-form
                  v-model="location"
                  enable-map
              ></location-form>
            </v-stepper-content>

            <v-stepper-content :step="4" class="white">
              CONTACT
            </v-stepper-content>

            <v-stepper-content :step="5" class="grey lighten-1">
              CONFIRMAR
            </v-stepper-content>

        </v-stepper>

      </v-col>

      <!--LOCATION-->


      <!--CONTACT-->


    </v-row>

    <!--NAVIGATION CART DETAIL-->
    <v-navigation-drawer width="300" temporary v-model="showOrder" right fixed class="py-2 pl-2">

      <cart-detail
          :items="getOrderItems"
          @addProduct="addProduct"
          @removeProduct="removeProduct"
          @clearOrder="$store.commit('clearOrder')"
          :quantity-total="$store.getters.getQuantityTotal"
          :amount-total="$store.getters.getAmountTotal"
          show-actions
      ></cart-detail>
    </v-navigation-drawer>

  </v-container>
</template>

<script>
import ProductProvider from "@/modules/delivery/providers/ProductProvider";
import ProductFilters from "@/modules/delivery/components/ProductFilters/ProductFilters";
import CartButton from "@/modules/delivery/components/CartButton/CartButton";
import CartDetail from "@/modules/delivery/components/CartDetail/CartDetail";
import ProductCard from "@/modules/delivery/components/ProductCard/ProductCard";
import LocationForm from "@/modules/maps/components/LocationForm/LocationForm";
import ProductCategoryProvider from "@/modules/delivery/providers/ProductCategoryProvider";
import DeliveryMode from "@/modules/delivery/components/DeliveryMode/DeliveryMode";

export default {
  name: "OrderPage",
  components: {DeliveryMode, LocationForm, ProductCard, CartDetail, CartButton, ProductFilters},
  data() {
    return {
      showOrder: false,
      step: 1,
      products: [],
      categories: [],
      filters: {
        name: null,
        ingredients: [],
        category: null
      }
    }
  },
  mounted() {
    this.fetchCategories()
    this.fetchProducts()
  },
  computed: {
    location: {
      get() {
        return this.$store.state.delivery.order.location
      },
      set(val) {
        this.$store.commit('setOrderLocation', val)
      }
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
        return this.categories.filter(c => c.id === this.filters.category)
      }
      return this.categories
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
    fetchCategories() {
      ProductCategoryProvider.fetchProductCategories().then(r => {
        this.categories = r.data.productCategoryFetch
      })
    },
    fetchProducts() {
      ProductProvider.fetchProductsFiltered(this.filters).then(r => {
        this.products = r.data.productFetchFiltered
      })
    }
  }
}
</script>

<style scoped>
.scroll {
  overflow-y: scroll
}
</style>
