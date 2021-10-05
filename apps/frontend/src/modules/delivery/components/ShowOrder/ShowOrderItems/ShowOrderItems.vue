<template>
  <v-card height="100%" :flat="flat">
    <v-card-title>{{ $t('delivery.product.products') }}</v-card-title>
    <v-card-text class="text-left">
      <!--RENDER ITEMS GROUP BY CATEGORY-->
      <order-items md="12" :items="items"></order-items>

      <cart-total
          :amount-total="amountTotal"
          :delivery-cost="deliveryCost"
          :amount-products="amountProducts"
      />


    </v-card-text>
  </v-card>

</template>

<script>
import OrderItems from "@/modules/delivery/components/OrderItems/OrderItems";
import CartTotal from "@/modules/delivery/components/CartTotal/CartTotal";

export default {
  name: "ShowOrderItems",
  components: {CartTotal, OrderItems},
  props: {
    items: {type: Array},
    amountTotal: {type: Number, default: 0},
    amountProducts: {type: Number, default: 0},
    deliveryCost: {type: Number, default: null},
    flat: {type: Boolean, default: false}
  },
}
</script>

<style scoped>

</style>
