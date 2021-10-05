<template>
  <v-container>
  <h3>Arqueo de caja</h3>
    {{data}}
  </v-container>
</template>

<script>
import OrderProvider from "@/modules/delivery/providers/OrderProvider";

export default {
  name: "OrderCashRegisterPage",
  data(){
    return {
      data: null
    }
  },
  created() {
    this.fetch()
  },
  methods:{
    fetch(){
      OrderProvider.fetchOrderGroupByUser()
      .then(r => {
        this.data = r.data.orderGroupByUser
      })
    }
  }
}
</script>

<style scoped>

</style>
