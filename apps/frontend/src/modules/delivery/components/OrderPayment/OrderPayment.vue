<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" class="px-6">
      <h3
          class="text-center"
          :class="{'text-h4': $vuetify.breakpoint.smAndUp}"
      >
        {{ $t('delivery.orderPayment') }}
      </h3>
      <p
          class="text-center"
      >
        {{ $t('delivery.orderPaymentDescription') }}
      </p>
    </v-col>

    <v-col cols="12" sm="8" md="8" class="px-6">
      <v-card>
        <v-radio-group v-model="paymentMode">
          <v-card-text>
            <v-radio value="CASH" label="Efectivo"></v-radio>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-radio value="BANK_TRANSFER" label="Transferencia Bancaria"></v-radio>
            <v-alert v-if="paymentMode === 'BANK_TRANSFER' " type="info">{{$t('delivery.payment.receiptRequired')}}</v-alert>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-radio value="MP_TRANSFER" label="Transferencia Mercado Pago"></v-radio>
            <v-alert v-if="paymentMode === 'MP_TRANSFER' " type="info">{{$t('delivery.payment.receiptRequired')}}</v-alert>
          </v-card-text>
        </v-radio-group>

      </v-card>
    </v-col>

    <v-col cols="12" sm="8" md="8" class="text-right">
      <submit-button
          text="common.next"
          @click="$emit('next')"
          :disabled="!this.paymentMode"
      ></submit-button>
    </v-col>
  </v-row>
</template>

<script>
import {SubmitButton} from "@dracul/common-frontend"
export default {
  name: "OrderPayment",
  components: {SubmitButton},
  computed: {
    paymentMode: {
      get() {
        return this.$store.getters.getOrderPayment.method
      },
      set(val) {
        this.$store.commit('setOrderPaymentMethod', val)
      }
    },
    paymentReceiptFile(){
        return this.$store.getters.getOrderPayment.receiptFile
    }
  }
}
</script>

<style scoped>

</style>
