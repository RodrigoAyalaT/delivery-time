<template>
  <v-container fluid>
    <cart-button
        v-if="[2,3].includes(step)"
        :total="$store.getters.getQuantityTotal"
        @click="showOrder=!showOrder"
    ></cart-button>
    <v-row>

      <!--STEPPER-->
      <v-col cols="12">
        <section id="inicio"></section>
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
                complete-icon="call"
            >
              Contacto
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :step="4"
                editable
                complete-icon="done"
            >
              Confirmar
            </v-stepper-step>

          </v-stepper-header>
        </v-stepper>
      </v-col>


      <v-col cols="12">
        <v-stepper v-model="step">

          <v-stepper-content :step="1" class="py-0">
            <order-mode @confirm="step=2"></order-mode>
          </v-stepper-content>


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

              <v-col cols="12" sm="8" md="9" class="pt-0">

                <v-row v-for="category in getCategories" :key="category.id">

                  <v-col cols="12" class="my-2">
                    <section :id="category.name">
                      <h5 class="text-h5 grey--text text--darken-3">{{ category.name }}</h5>
                    </section>
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
                        edit-quantity
                    ></product-card>
                  </v-col>
                </v-row>
              </v-col>


            </v-row>
          </v-stepper-content>

          <v-stepper-content :step="3" class="white">
            <contact-form @next="nextStep"></contact-form>
          </v-stepper-content>

          <v-stepper-content :step="4" class="grey lighten-4">

            <show-order
                @editContact="step=3"
                @editLocation="step=1"
                @editProducts="step=2"
            />
          </v-stepper-content>

        </v-stepper>

      </v-col>

      <!--LOCATION-->


      <!--CONTACT-->


    </v-row>

    <!--NAVIGATION CART DETAIL-->
    <v-navigation-drawer
        width="320"
        temporary
        v-model="showOrder"
        right fixed
        class="py-2 pl-2"
    >
      <v-btn
          icon
             x-small fab
             absolute :style="{top: '0.5%', right: '1%'}"
             @click="showOrder = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
      <cart-detail
          :items="getOrderItems"
          @addProduct="addProduct"
          @removeProduct="removeProduct"
          @clearOrder="$store.commit('clearOrder')"
          @next="nextStep"
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
import ProductCategoryProvider from "@/modules/delivery/providers/ProductCategoryProvider";
import OrderMode from "@/modules/delivery/components/OrderMode/OrderMode";
import ContactForm from "@/modules/delivery/components/ContactForm/ContactForm";
import ShowOrder from "@/modules/delivery/components/ShowOrder/ShowOrder";

export default {
  name: "OrderPage",
  components: {ShowOrder, ContactForm, OrderMode, ProductCard, CartDetail, CartButton, ProductFilters},
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
  watch: {
    step(val) {
      if (val === 2) {
        let menu = this.getCategoriesMenu
        if(!menu.includes('inicio')){
          menu.unshift('inicio')
        }
        this.$store.commit('setExtensionMenu', menu)
      } else {
        this.$store.commit('setExtensionMenu', [])
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('setExtensionMenu', [])
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
    getCategoriesMenu() {
      return this.categories.map(category => {
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
    nextStep() {
      this.step++
      this.showOrder = false
    },
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
