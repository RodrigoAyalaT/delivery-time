<template>
  <div>
    <template v-if="loading">
      <loading></loading>
    </template>
    <template v-if="orders">
      <v-row>

        <v-col cols="12" sm="5">
          <v-card>
            <v-card-title class="text--h4 grey--text text--darken-2">{{ $t('delivery.mode.takeAway') }}</v-card-title>

            <template v-if="takeAwayOrders.length">
              <order-manager-table
                  :orders="takeAwayOrders"
                  :zones="zones"
                  @next="next"
                  @showOrder="showOrder"
                  :state="state"
                  mode="TAKE_AWAY"
              ></order-manager-table>
            </template>

            <template v-else>
              <v-alert type="info">Sin ordenes pendientes</v-alert>
            </template>


          </v-card>
        </v-col>

        <v-col cols="12" sm="7">
          <v-card>
            <v-card-title class="text--h4 grey--text text--darken-2">{{ $t('delivery.mode.delivery') }}</v-card-title>
            <order-manager-table
                :orders="deliveryOrders"
                :zones="zones"
                enable-zone
                @next="next"
                @showOrder="showOrder"
                :state="state"
                mode="DELIVERY"
            ></order-manager-table>
          </v-card>
        </v-col>

      </v-row>

    </template>

    <simple-dialog
        v-if="enableShowOrder"
        v-model="enableShowOrder"
        @close="enableShowOrder=false"
        fullscreen
    >
      <show-order
          :identifier="orderIdentifierToShow"
      ></show-order>
    </simple-dialog>
  </div>
</template>

<script>
import OrderProvider from "@/modules/delivery/providers/OrderProvider";
import {Loading, SimpleDialog} from "@dracul/common-frontend"
import OrderManagerTable from "@/modules/delivery/components/OrderManagerTable/OrderManagerTable";
import ZoneProvider from "@/modules/maps/providers/ZoneProvider";
import ShowOrder from "@/modules/delivery/components/ShowOrder/ShowOrder";

export default {
  name: "OrderManager",
  components: {ShowOrder, OrderManagerTable, Loading, SimpleDialog},
  props: {
    state: {type: String}
  },
  data() {
    return {
      loading: false,
      loadingOrder: false,
      orders: [],
      zones: [],

      orderIdentifierToShow: null,
      enableShowOrder: false,
    }
  },
  mounted() {
    this.fetchZones()
    this.fetchOrders()
  },
  computed: {
    takeAwayOrders() {
      return this.orders.filter(order => order.delivery.mode === 'TAKE_AWAY')
    },
    deliveryOrders() {
      return this.orders.filter(order => order.delivery.mode === 'DELIVERY')
    }
  },
  methods: {
    showOrder(order) {
      this.orderIdentifierToShow = order.identifier
      this.enableShowOrder = true
    },
    getNextStep(order) {
      let index = this.$store.getters.getOrderStates.findIndex(state => state === order.state)

      //Skip "ON_THE_WAY when is TAKE_AWAY
      if(order.delivery.mode === 'TAKE_AWAY' && order.state === 'READY'){
        return this.$store.getters.getOrderStates[index + 2]
      //Next STEP
      }else if(this.$store.getters.getOrderStates.length > (index + 1)){
        return this.$store.getters.getOrderStates[index + 1]
      }

      return order.state
    },
    next(order) {
      this.loadingOrder = true
      OrderProvider.updateOrderState({
        id: order.id,
        state: this.getNextStep(order)
      })
          .then(() => {
            this.fetchOrders()
            this.$emit('changed')
          })
          .catch(e => {
            console.error(e)
          })
          .finally(() => {
            this.loadingOrder = false
          })
    },
    fetchZones() {
      ZoneProvider.fetchZones()
          .then(r => {
            this.zones = r.data.zoneFetch
          })
          .catch(e => {
            console.error(e)
          })
          .finally(() => {
          })
    },
    fetchOrders() {
      this.loading = true
      OrderProvider.fetchOrdersByState(this.state)
          .then(r => {
            this.orders = r.data.orderFetchByState
          })
          .catch(e => {
            console.error(e)
          })
          .finally(() => {
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>

</style>
