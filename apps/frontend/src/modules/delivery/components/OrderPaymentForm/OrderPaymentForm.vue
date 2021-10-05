<template>
  <payment-method v-model="paymentMode" @confirm="$emit('next')"></payment-method>
</template>

<script>
import PaymentMethod from "@/modules/payment/components/PaymentMethod/PaymentMethod";
export default {
  name: "OrderPaymentForm",
  components: {PaymentMethod},
  computed: {
    paymentMode: {
      get() {
        return this.$store.getters.getOrderPayment.method
      },
      set(val) {
        this.$store.commit('setOrderPaymentMethod', val)
      }
    },
    paymentReceiptFile(){
        return this.$store.getters.getOrderPayment.receiptFile
    }
  }
}
</script>

<style scoped>

</style>
