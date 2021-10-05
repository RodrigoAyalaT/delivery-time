<template>
  <v-row dense>


    <v-col cols="12" class="text-left">
      <v-list dense>

        <v-list-item v-if="deliveryCost">
          <v-list-item-avatar size="30">
            <v-icon>shopping_cart</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ $t('delivery.cart.products') }}:
          </v-list-item-content>
          <v-list-item-action-text>
            <v-list-item-title>
              ${{ amountProducts }}
            </v-list-item-title>
          </v-list-item-action-text>
        </v-list-item>

        <v-list-item v-if="deliveryCost">
          <v-list-item-avatar size="30">
            <v-icon>delivery_dining</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ $t('delivery.cart.deliveryCost') }}:
          </v-list-item-content>
          <v-list-item-action-text>
            <v-list-item-title>
              ${{ deliveryCost }}
            </v-list-item-title>
          </v-list-item-action-text>
        </v-list-item>

        <v-list-item>
          <v-list-item-avatar size="30">
            <v-icon>payments</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            {{ $t('delivery.cart.total') }}:
          </v-list-item-content>
          <v-list-item-action-text>
            <v-list-item-title>
              <b>${{ amountTotal }}</b>
            </v-list-item-title>
          </v-list-item-action-text>
        </v-list-item>

      </v-list>

    </v-col>


  </v-row>
</template>

<script>
export default {
  name: "CartTotal",
  props: {
    amountProducts: {type: Number, default: 0},
    deliveryCost: {type: Number, default: null},
    amountTotal: {type: Number, default: 0},
  }
}
</script>

<style scoped>

</style>
