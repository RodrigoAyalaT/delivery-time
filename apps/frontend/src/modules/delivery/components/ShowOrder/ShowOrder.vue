<template>
  <v-row
      class=""
      v-if="$store.getters.isSettingsReady && $store.getters.getOrder"
      justify="center"
  >

    <template v-if="loading">
      <v-col cols="12" sm="6" md="8">
        <loading></loading>
      </v-col>
    </template>

    <template v-else>

      <v-col cols="12" md="8">

        <v-row dense>
          <v-col cols="12" md="6">
            <show-order-state
                :identifier="identifier"
                :state="$store.getters.getOrder.state"
                :number="$store.getters.getOrder.number"
            />

          </v-col>

          <v-col cols="12" md="6">

            <show-order-payment
                :order="$store.getters.getOrder"
                @orderModified="onOrderModified"
            ></show-order-payment>

          </v-col>

          <v-col cols="12">

          </v-col>

          <v-col cols="12">
            <show-order-location
                :order="$store.getters.getOrder"
            />
          </v-col>

          <v-col cols="12">
            <show-order-contact
                :order="$store.getters.getOrder"
            />
          </v-col>


        </v-row>

      </v-col>


      <v-col cols="12" md="4">
        <show-order-items
            :items="$store.getters.getOrder.items"
            :delivery-cost="$store.getters.getDeliveryCost"
            :amount-total="$store.getters.getAmountTotal"
            :amount-products="$store.getters.getAmountProducts"
            flat
        />

        <!--<show-order-total
            :quantity="$store.getters.getOrder.totalQuantity"
            :total="$store.getters.getOrder.totalAmount"
        />-->
      </v-col>



    </template>
  </v-row>
</template>

<script>
import ShowOrderContact from "@/modules/delivery/components/ShowOrder/ShowOrderContact/ShowOrderContact";
import ShowOrderLocation from "@/modules/delivery/components/ShowOrder/ShowOrderLocation/ShowOrderLocation";
import ShowOrderItems from "@/modules/delivery/components/ShowOrder/ShowOrderItems/ShowOrderItems";
import {Loading} from "@dracul/common-frontend"
import ShowOrderState from "@/modules/delivery/components/ShowOrder/ShowOrderState/ShowOrderState";
import ShowOrderPayment from "@/modules/delivery/components/ShowOrder/ShowOrderPayment/ShowOrderPayment";

//import ShowOrderTotal from "@/modules/delivery/components/ShowOrder/ShowOrderTotal/ShowOrderTotal";
//import ShowOrderIdentifier from "@/modules/delivery/components/ShowOrder/ShowOrderIdentifier/ShowOrderIdentifier";

export default {
  name: "ShowOrder",
  components: {
    // ShowOrderIdentifier,
    ShowOrderPayment,
    ShowOrderState,
    Loading,
    ShowOrderItems,
  ///  ShowOrderTotal,
    ShowOrderLocation,
    ShowOrderContact
  },
  props: {
    identifier: {type: String, required: true},
  },
  data() {
    return {
      order: null,
      loading: false,
      loadingSate: false,
      timeout: null
    }
  },
  mounted() {
    this.fetchOrder()
    this.refreshOrderState()
  },
  destroyed() {
    clearTimeout(this.timeout)
  },
  methods: {
    onOrderModified(order) {
      console.log("onOrderModified",order)
      this.order = order
    },
    refreshOrderState() {
      this.timeout = setTimeout(() => {
        this.fetchOrderState()
            .then(() => {
              this.refreshOrderState()
            })
      }, 30000)

    },
    fetchOrder() {
      return new Promise((resolve) => {

        if (!this.identifier) {
          console.warn("Identifier missed")
          return Promise.resolve()
        }

        this.loading = true
        this.$store.dispatch('findOrderByIdentifier', this.identifier)
            .then(() => resolve())
            .catch(e => console.error(e))
            .finally(() => this.loading = false)
      })
    },

    fetchOrderState() {
      return new Promise((resolve) => {

        if (!this.identifier) {
          console.warn("Identifier missed")
          return Promise.resolve()
        }

        this.loadingSate = true
        this.$store.dispatch('refreshOrderStateByIdentifier', this.identifier)
            .then(() => resolve())
            .catch(e => console.error(e))
            .finally(() => this.loadingSate = false)

      })
    }
  }

}
</script>

<style scoped>

</style>
