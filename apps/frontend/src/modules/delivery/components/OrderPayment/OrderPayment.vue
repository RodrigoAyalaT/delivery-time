<template>
  <v-card :flat="flat" height="100%">
    <v-card-title class="py-2">
      {{ $t('delivery.payment.title') }}
    </v-card-title>
    <v-row no-gutters>

      <v-col cols="12" >
        <show-field
            :value="$t('delivery.payment.method.'+$store.getters.getOrder.payment.method)"
            :label="$t('delivery.order.labels.paymentMethod')"
            :icon="getIcon"
        />

        <show-field
            :value="'$'+$store.getters.getAmountTotal"
            :label="$t('delivery.cart.total')"
            icon="payments"
        />
      </v-col>

    </v-row>
    <v-btn
        v-if="$store.getters.getOrder.payment.receiptFile"
        absolute icon bottom right
        :href="$store.getters.getOrder.payment.receiptFile" target="_blank"
    >
      <v-icon>attachment</v-icon>
    </v-btn>
    <v-divider v-if="divider"></v-divider>
  </v-card>
</template>

<script>
import {ShowField} from '@dracul/common-frontend'

export default {
  name: "OrderPayment",
  components: {ShowField},
  props: {
    divider: {type:Boolean, default: false},
    flat: {type:Boolean, default: false},
    order: {type:Object, required: true},
    title: {type: String, default: 'delivery.mode.deliveryMode'},

  },
  computed:{
    getIcon(){
      switch(this.order.payment.method){
        case 'CASH':
          return 'monetization_on'
        case 'BANK_TRANSFER':
          return 'account_balance'
        case 'MP_TRANSFER':
          return 'account_balance'
        default:
          return 'monetization_on'
      }
    }
  }
}
</script>

<style scoped>

</style>
