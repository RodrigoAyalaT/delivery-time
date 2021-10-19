<template>
  <v-container fluid class="pa-0">
    <cart-button
        v-if="[2].includes(step)"
        :total="$store.getters.getQuantityTotal"
        @click="showOrder=!showOrder"
    ></cart-button>
    <v-row no-gutters>

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
              Pago
            </v-stepper-step>

            <v-divider></v-divider>
            <v-stepper-step
                :step="5"
                editable
                complete-icon="price_check"
            >
              Confirmar
            </v-stepper-step>

          </v-stepper-header>
        </v-stepper>
      </v-col>


      <v-col cols="12">
        <section id="initStep"></section>
        <v-stepper v-model="step">

          <!--ORDER-MODE TAKE_AWAY/DELIVERY-->
          <v-stepper-content :step="1" class="py-0">
            <v-row align="center" justify="center">
              <v-col cols="12" md="5">
                <order-mode @confirm="step=2"></order-mode>
              </v-col>
            </v-row>
          </v-stepper-content>

          <!--PRODUCTS-->
          <v-stepper-content :step="2" class="pa-0 grey lighten-4">

            <product-gallery></product-gallery>
            <div class="text-right pa-3">
              <v-btn
                  v-if="[2].includes(step)"
                  @click="showOrder=!showOrder"
                  class="primary onPrimary--text "
              >
                <v-icon left>shopping_cart</v-icon>
                {{$t('common.next')}}
              </v-btn>
            </div>

          </v-stepper-content>

          <v-stepper-content :step="3" class="white">
            <v-row align="center" justify="center">

              <v-col cols="12" md="5">
                <contact-form @next="nextStep" email-required next-button></contact-form>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content :step="4" class="grey lighten-4 px-0">
            <order-payment-form @next="nextStep"></order-payment-form>
          </v-stepper-content>

          <v-stepper-content :step="5" class="grey lighten-4 px-0">
            <order-review
                @editLocation="step=1"
                @editProducts="step=2"
                @editContact="step=3"
                @editPayment="step=4"
                @confirm="step=5"
            />
          </v-stepper-content>

        </v-stepper>

      </v-col>

    </v-row>

    <!--NAVIGATION CART DETAIL-->
    <v-navigation-drawer
        width="325"
        temporary
        v-model="showOrder"
        right fixed
        class="py-2 pl-2 pr-3"
    >
      <v-btn
          icon
          x-small fab
          absolute :style="{top: '0.5%', right: '3%'}"
          @click="showOrder = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
      <cart-detail
          flat
          :items="getOrderItems"
          @next="nextStep"
          :quantity-total="$store.getters.getQuantityTotal"
          :amount-total="$store.getters.getAmountTotal"
          :delivery-cost="$store.getters.getDeliveryCost"
          :amount-products="$store.getters.getAmountProducts"
          show-actions
          @close="showOrder = false"
          show-minimun
      ></cart-detail>
    </v-navigation-drawer>

  </v-container>
</template>

<script>
import CartButton from "@/modules/delivery/components/CartButton/CartButton";
import CartDetail from "@/modules/delivery/components/CartDetail/CartDetail";
import OrderMode from "@/modules/delivery/components/OrderMode/OrderMode";
import ContactForm from "@/modules/delivery/components/ContactForm/ContactForm";
import ProductGallery from "@/modules/delivery/components/ProductGallery/ProductGallery";
import OrderReview from "@/modules/delivery/components/OrderReview/OrderReview";
import OrderPaymentForm from "@/modules/delivery/components/OrderPaymentForm";

export default {
  name: "OrderPage",
  components: {
    OrderPaymentForm,
    OrderReview,
    ProductGallery,
    ContactForm,
    OrderMode,
    CartDetail,
    CartButton
  },
  data() {
    return {
      showOrder: false,
      step: 1,
      products: [],
      categories: [],
      loading: false
    }
  },
  watch: {
    step(val) {
      if (val === 2) {
        let menu = this.getCategoriesMenu
        if (!menu.includes('inicio')) {
          menu.unshift('inicio')
        }
        this.$store.commit('setExtensionMenu', menu)
      } else {
        this.$store.commit('setExtensionMenu', [])
      }
      this.$vuetify.goTo('#initStep')
    },
    '$store.state.delivery.currentOrderIdentifier': {
      handler() {
        this.checkOrderIdentifierAndRedirect()
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('setExtensionMenu', [])
  },
  created() {
    this.$store.dispatch('initOrderIfIsNull')
    this.$store.dispatch('resetOrderIfStateIsDelivered')
  },
  mounted() {
    this.$store.dispatch('fetchCategories')
    this.checkOrderIdentifierAndRedirect()
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
    }
  },
  methods: {
    checkOrderIdentifierAndRedirect() {
      if (this.$store.getters.getCurrentOrderIdentifier && this.$store.getters.state != "DELIVERED") {
        this.$router.push({name: 'OrderViewPage', params: {identifier: this.$store.getters.getCurrentOrderIdentifier}})
      }
    },
    nextStep() {
      this.step++
      this.showOrder = false
    },

  }
}
</script>

<style scoped>
.scroll {
  overflow-y: scroll
}
</style>
