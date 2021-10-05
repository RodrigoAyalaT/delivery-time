<template>
  <card-edit @edit="$emit('edit')">
    <order-payment :order="$store.getters.getOrder" divider flat></order-payment>
  </card-edit>
</template>

<script>
import CardEdit from "@/modules/delivery/components/CardEdit/CardEdit";
import OrderPayment from "@/modules/delivery/components/OrderPayment/OrderPayment";

export default {
  name: "OrderReviewPayment",
  components: {OrderPayment, CardEdit},
}
</script>

<style scoped>

</style>
