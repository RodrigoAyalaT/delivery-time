<template>
  <v-card height="100%" :flat="flat">
    <v-card-title>{{ $t('delivery.product.products') }}</v-card-title>
    <v-card-text>
          <!--RENDER ITEMS GROUP BY CATEGORY-->
          <order-items md="12" :items="items"></order-items>
    </v-card-text>
  </v-card>

</template>

<script>
import OrderItems from "@/modules/delivery/components/OrderItems/OrderItems";

export default {
  name: "ShowOrderItems",
  components: {OrderItems},
  props: {
    items: {type: Array},
    flat: {type: Boolean, default: false}
  },
}
</script>

<style scoped>

</style>
