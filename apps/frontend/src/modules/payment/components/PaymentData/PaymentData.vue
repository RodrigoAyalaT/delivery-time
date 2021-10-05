<template>
  <v-list dense v-if="paymentMethods" class="pa-0">

    <template v-if="paymentMethod === paymentMethods.bankTransfer.identifier">
      <v-list-item>
        <v-list-item-title>CBU</v-list-item-title>
        <v-list-item-subtitle>{{paymentMethods.bankTransfer.cbu}}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item v-if="paymentMethods.bankTransfer.alias">
        <v-list-item-title>Alias</v-list-item-title>
        <v-list-item-subtitle>{{paymentMethods.bankTransfer.alias}}</v-list-item-subtitle>
      </v-list-item>
    </template>

    <template v-if="paymentMethod === paymentMethods.mercadoPagoTransfer.identifier">
      <v-list-item>
        <v-list-item-title>CVU</v-list-item-title>
        <v-list-item-subtitle>{{paymentMethods.mercadoPagoTransfer.cvu}}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item v-if="paymentMethods.mercadoPagoTransfer.alias">
        <v-list-item-title>Alias</v-list-item-title>
        <v-list-item-subtitle>{{paymentMethods.mercadoPagoTransfer.alias}}</v-list-item-subtitle>
      </v-list-item>
    </template>

    <v-list-item v-if="amount">
      <v-list-item-title>Monto</v-list-item-title>
      <v-list-item-subtitle>${{amount}}</v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "PaymentData",
  props: {
    paymentMethod: {type: String},
    amount: {type: Number}
  },
  computed:{
    paymentMethods() {
      return this.$store.getters.getPaymentMethods
    }
  },
  created() {
    if (this.paymentMethods === null) {
      this.$store.dispatch('findPaymentMethods')
    }
  },
}
</script>

<style scoped>

</style>
