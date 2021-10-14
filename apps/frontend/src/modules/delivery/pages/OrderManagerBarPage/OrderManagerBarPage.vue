<template>

  <v-container fluid>
    <v-btn
        fab absolute right x-small color="teal" dark
        @click="refresh"
    >
      <v-icon>refresh</v-icon>
    </v-btn>
    <v-tabs v-model="tabState">
      <v-tab

          v-for="state in kitchenStates"
          :key="state"
      >
        {{ $t('delivery.states.' + state) }} ({{getStateCount(state)}})
      </v-tab>
    </v-tabs>

    <v-tabs-items v-if="show" v-model="tabState">
      <v-tab-item
          v-for="state in kitchenStates"
          :key="state"

      >
        <order-manager
            v-if="state === kitchenStates[tabState]"
            :state="state"
            @changed="loadOrderGroupByState"
        >

        </order-manager>
      </v-tab-item>
    </v-tabs-items>

  </v-container>

</template>

<script>
import OrderManager from "@/modules/delivery/components/OrderManager/OrderManager";
import OrderProvider from "@/modules/delivery/providers/OrderProvider";

export default {
  name: "OrderManagerBarPage",
  components: {OrderManager},
  data() {
    return {
      show: true,
      tabState: 0,
      orderGroupByState: [],
      kitchenStates: ['PENDING_RECEIPT','REVIEW']
    }
  },
  mounted() {
    this.$store.dispatch('fetchCategories')
    this.loadOrderGroupByState()
  },
  computed: {
    getStateCount() {
      return state => {
        let r = this.orderGroupByState.find(e => e.state === state)
        return r ? r.count : 0
      }
    }
  },
  methods: {
    loadOrderGroupByState() {
      OrderProvider.fetchOrderGroupByState()
          .then(resp => {
            this.orderGroupByState = resp.data.orderGroupByState
          })
    },
    refresh() {
      this.show = false
      this.$nextTick(() => this.show = true)
    }
  }
}
</script>

<style scoped>

</style>
