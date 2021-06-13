<template>
  <div>
    <template v-if="loading">
      <loading></loading>
    </template>
    <template v-if="orders">
      <v-row>

        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title class="text--h4 grey--text text--darken-2">{{ $t('delivery.mode.takeAway') }}</v-card-title>
            <order-manager-table :orders="takeAwayOrders"></order-manager-table>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title class="text--h4 grey--text text--darken-2">{{ $t('delivery.mode.delivery') }}</v-card-title>
            <order-manager-table :orders="deliveryOrders"></order-manager-table>
          </v-card>
        </v-col>

      </v-row>

    </template>
  </div>
</template>

<script>
import OrderProvider from "@/modules/delivery/providers/OrderProvider";
import {Loading} from "@dracul/common-frontend"
import OrderManagerTable from "@/modules/delivery/components/OrderManagerTable/OrderManagerTable";

export default {
  name: "OrderManager",
  components: {OrderManagerTable, Loading},
  props: {
    state: {type: String}
  },
  data() {
    return {
      loading: false,
      orders: []
    }
  },
  mounted() {
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
