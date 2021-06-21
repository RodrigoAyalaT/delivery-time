<template>
  <v-card
      class="grey--text text--darken-2"
  >
    <v-card-title>{{ $t('delivery.product.products') }}</v-card-title>
    <v-card-text>
      <v-row dense justify="center">
        <v-col cols="12" sm="6" md="6">
          <v-row dense>
            <v-col v-for="item in items"
                   :key="item.product.id"
                   cols="12"
            >
              <product-card-item
                  :product="item.product"
                  :quantity="item.quantity"
              ></product-card-item>
            </v-col>
          </v-row>

        </v-col>

      </v-row>
    </v-card-text>
  </v-card>

</template>

<script>
import ProductCardItem from "@/modules/delivery/components/ProductCardItem/ProductCardItem";

export default {
  name: "OrderConfirmationItems",
  components: {ProductCardItem},
  props: {
    items: {type: Array}
  },
}
</script>

<style scoped>

</style>
