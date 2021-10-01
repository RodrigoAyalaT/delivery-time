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
        <v-radio-group v-model="value">

          <!--CASH-->
          <template v-if="getPaymentMethods && getPaymentMethods.cash.enable">
            <v-card-text>
              <v-radio :value="getPaymentMethods.cash.identifier" label="Efectivo"></v-radio>
            </v-card-text>
            <v-divider></v-divider>
          </template>

          <!--BANK_TRANSFER-->
          <template v-if="getPaymentMethods && getPaymentMethods.bankTransfer.enable">
            <v-card-text>
              <v-radio :value="getPaymentMethods.bankTransfer.identifier" label="Transferencia Bancaria"></v-radio>
              <v-alert
                  v-if="value === getPaymentMethods.bankTransfer.identifier && getPaymentMethods.bankTransfer.info "
                  type="info"
              >
                {{ getPaymentMethods.bankTransfer.info }}
              </v-alert>
            </v-card-text>
            <v-divider></v-divider>
          </template>

          <!--MP_TRANSFER-->
          <template v-if="getPaymentMethods && getPaymentMethods.mercadoPagoTransfer.enable">
            <v-card-text>
              <v-radio :value="getPaymentMethods.mercadoPagoTransfer.identifier"
                       label="Transferencia Mercado Pago"></v-radio>
              <v-alert
                  v-if="value === getPaymentMethods.mercadoPagoTransfer.identifier && getPaymentMethods.mercadoPagoTransfer.info "
                  type="info"
              >
                {{ getPaymentMethods.mercadoPagoTransfer.info }}
              </v-alert>
            </v-card-text>
          </template>

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
export default {
  name: "PaymentMethod",
  props: {
    value: {type: String}
  },
  computed: {
    getPaymentMethods() {
      return this.$store.getters.getPaymentMethods
    }
  }
}
</script>

<style scoped>

</style>
