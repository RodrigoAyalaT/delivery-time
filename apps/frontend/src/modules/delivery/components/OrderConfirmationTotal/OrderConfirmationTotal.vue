<template>
  <v-row no-gutters >
    <v-col cols="12" class="mb-3">
      <card-total
          icon="shop"
          :title="$t('delivery.cart.quantity')"
          :quantity="$store.getters.getQuantityTotal"
      ></card-total>
    </v-col>

    <v-col cols="12" class="mb-3">
      <card-total
          icon="money"
          :title="$t('delivery.cart.total')"
          :quantity="$store.getters.getAmountTotal"
          money
      ></card-total>
    </v-col>


  </v-row>

</template>

<script>
import CardTotal from "@/modules/delivery/components/CardTotal/CardTotal";

export default {
  name: "OrderConfirmationTotal",
  components: {CardTotal}
}
</script>

<style scoped>

</style>
