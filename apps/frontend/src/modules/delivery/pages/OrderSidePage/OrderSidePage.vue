<template>
  <v-container>
    <cart-button :total="$store.getters.getQuantityTotal" @click="showOrder=!showOrder"></cart-button>
    <v-row>

      <!--STEPPER-->
      <v-col cols="12">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step
                editable
                step="1"
                complete-icon="inventory_2"
                edit-icon="inventory_2"
            >
              Productos
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                step="2"
                editable
                complete-icon="place"
            >
              Dirección
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                step="3"
                editable
                complete-icon="call"
            >
              Contacto
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-col>

      <!--PRODUCTS-->
      <v-col cols="12">


        <v-row>
          <v-col cols="12" sm="8" md="9">
            <product-filters v-model="filters" @input="fetchProducts"></product-filters>
            <v-row>
              <v-col v-for="product in products"
                     :key="product.id"
                     cols="6" sm="6" md="3"
                     class="pt-0"
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

          <!--CART DETAIL-->
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="12" sm="4" md="3">
            <cart-detail
                :items="getOrderItems"
                @addProduct="addProduct"
                @removeProduct="removeProduct"
                @clearOrder="$store.commit('clearOrder')"
                :quantity-total="$store.getters.getQuantityTotal"
                :amount-total="$store.getters.getAmountTotal"

            ></cart-detail>
          </v-col>

        </v-row>



      </v-col>

      <!--LOCATION-->


      <!--CONTACT-->



    </v-row>

    <!--NAVIGATION CART DETAIL-->
    <v-navigation-drawer temporary v-model="showOrder" right fixed>

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

export default {
  name: "OrderSidePage",
  components: {ProductCard, CartDetail, CartButton, ProductFilters},
  data() {
    return {
      showOrder: false,
      step: 1,
      products: [],
      filters: {
        name: null,
        ingredients: []
      },
      order: {
        name: null,
        email: null,
        phone: null,
        address: null,
        items: []
      }
    }
  },
  mounted() {
    this.fetchProducts()
  },
  computed: {
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
