<template>
  <order-contact :order="order" />

</template>

<script>
import OrderContact from "@/modules/delivery/components/OrderContact/OrderContact";

export default {
  name: "ShowOrderContact",
  components: {OrderContact},
  props: {
    order: {type: Object}
  }
}
</script>

<style scoped>

</style>
