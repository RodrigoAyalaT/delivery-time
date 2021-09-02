<template>
  <v-card
      class="grey--text text--darken-2"
  >
    <v-card-title>{{ $t('delivery.product.products') }}</v-card-title>
    <v-card-text>
          <!--RENDER ITEMS GROUP BY CATEGORY-->
          <order-items :items="items"></order-items>
    </v-card-text>
  </v-card>

</template>

<script>
import OrderItems from "@/modules/delivery/components/OrderItems/OrderItems";

export default {
  name: "ShowOrderItems",
  components: {OrderItems},
  props: {
    items: {type: Array}
  },
}
</script>

<style scoped>

</style>
