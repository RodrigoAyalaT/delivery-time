<template>
  <card-edit @edit="$emit('edit')">
    <order-contact :order="$store.getters.getOrder" flat divider />
  </card-edit>
</template>

<script>
import CardEdit from "@/modules/delivery/components/CardEdit/CardEdit";
import OrderContact from "@/modules/delivery/components/OrderContact/OrderContact";

export default {
  name: "OrderReviewContact",
  components: {OrderContact, CardEdit},
}
</script>

<style scoped>

</style>
