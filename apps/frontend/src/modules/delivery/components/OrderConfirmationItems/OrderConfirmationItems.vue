<template>
  <v-card
      :style="{height:'100%'}"
      @mouseenter="hover=true"
      @mouseleave="hover=false"
      class="grey--text text--darken-2"
  >
    <v-card-title>{{ $t('delivery.product.products') }}</v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <order-items :items="$store.state.delivery.order.items"></order-items>
        </v-col>
      </v-row>
    </v-card-text>
    <v-btn v-if="hover"
           color="primary" class="onPrimary--text"
           x-small fab
           absolute :style="{top: '3%', right: '3%'}"
           @click="$emit('edit')"
    >
      <v-icon>edit</v-icon>
    </v-btn>
  </v-card>

</template>

<script>
import OrderItems from "@/modules/delivery/components/OrderItems/OrderItems";

export default {
  name: "OrderConfirmationItems",
  components: {OrderItems},
  data() {
    return {
      hover: false,
    }
  }
}
</script>

<style scoped>

</style>
