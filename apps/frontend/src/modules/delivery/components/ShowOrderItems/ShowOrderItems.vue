<template>
  <v-card
      :style="{height:'100%'}"
      @mouseenter="hover=true"
      @mouseleave="hover=false"
      class="grey--text text--darken-2"
  >
    <v-card-title>{{ $t('delivery.product.products') }}</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col v-for="item in $store.state.delivery.order.items"
               :key="item.product.id"
               cols="12" sm="6" md="6"
        >
          <product-card-item
              :product="item.product"
              :quantity="$store.getters.getQuantity(item.product)"
          ></product-card-item>
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
import ProductCardItem from "@/modules/delivery/components/ProductCardItem/ProductCardItem";

export default {
  name: "ShowOrderItems",
  components: {ProductCardItem},
  data() {
    return {
      hover: false,
    }
  }
}
</script>

<style scoped>

</style>
