<template>
      <order-payment-receipt-file
          v-if="order.payment.method != 'CASH' && order.payment.receiptFile === null"
          @orderModified="onOrderModified"
      />
      <order-payment v-else :order="order"></order-payment>
</template>

<script>
import OrderPayment from "@/modules/delivery/components/OrderPayment/OrderPayment";
import OrderPaymentReceiptFile from "@/modules/delivery/components/OrderPaymentReceiptFile/OrderPaymentReceiptFile";

export default {
  name: "ShowOrderPayment",
  components: {OrderPaymentReceiptFile, OrderPayment},
  props: {
    order: {type: Object}
  },
  methods: {
    onOrderModified(order){
      console.log("ShowOrderPayment onOrderModified", order)
      this.$emit('orderModified',order)
    }
  }
}
</script>

<style scoped>

</style>
