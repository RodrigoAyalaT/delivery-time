<template>
  <order-location :order="$store.getters.getOrder"
  ></order-location>
</template>

<script>

import OrderLocation from "@/modules/delivery/components/OrderLocation/OrderLocation";

export default {
  name: "ShowOrderLocation",
  components: {OrderLocation},
  props: {
    order: {type: Object}
  },

}
</script>

<style scoped>

</style>
