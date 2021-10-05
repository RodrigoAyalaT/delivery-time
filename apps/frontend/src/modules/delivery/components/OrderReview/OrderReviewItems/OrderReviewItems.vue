<template>
  <card-edit @edit="$emit('edit')">
    <v-card-title>
      {{ $t('delivery.product.products') }}
    </v-card-title>

    <v-card-text class="px-1 my-0">
      <order-items :items="$store.state.delivery.order.items"></order-items>
    </v-card-text>
    <v-divider></v-divider>
  </card-edit>

</template>

<script>
import OrderItems from "@/modules/delivery/components/OrderItems/OrderItems";
import CardEdit from "@/modules/delivery/components/CardEdit/CardEdit";

export default {
  name: "OrderReviewItems",
  components: {OrderItems, CardEdit},
  data() {
    return {
      hover: false,
    }
  }
}
</script>

<style scoped>

</style>
