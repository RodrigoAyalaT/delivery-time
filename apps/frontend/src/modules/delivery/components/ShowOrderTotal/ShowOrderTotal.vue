<template>
  <v-row no-gutters >
    <v-col cols="12" class="mb-3">
      <card-total
          icon="shop"
          :title="$t('delivery.cart.quantity')"
          :quantity="quantity"
      ></card-total>
    </v-col>

    <v-col cols="12" class="mb-3">
      <card-total
          icon="money"
          :title="$t('delivery.cart.total')"
          :quantity="total"
          money
      ></card-total>
    </v-col>


  </v-row>

</template>

<script>
import CardTotal from "@/modules/delivery/components/CardTotal/CardTotal";

export default {
  name: "ShowOrderTotal",
  components: {CardTotal},
  props: {
    total: {type: Number},
    quantity: {type: Number}
  }
}
</script>

<style scoped>

</style>
