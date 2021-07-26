<template>
  <v-card
      class="grey--text text--darken-2"
  >
    <v-card-title>{{ $t('delivery.product.products') }}</v-card-title>
    <v-card-text>

      <v-row dense justify="center">
        <v-col cols="12" sm="6" md="6">
          <!--RENDER ITEMS GROUP BY CATEGORY-->
          <order-items :items="items"></order-items>
        </v-col>
      </v-row>
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
