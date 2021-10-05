<template>
  <v-row justify="center">

    <v-col cols="12" sm="8" md="8" class="text-left">
      <h3 class="">{{ $t('delivery.orderPayment') }}</h3>
    </v-col>


    <template v-if="getPaymentMethods">
      <v-col cols="12" sm="8" md="8">
        <v-card>
          <v-radio-group v-model="localValue">

            <!--CASH-->
            <template v-if="getPaymentMethods && getPaymentMethods.cash.enable">
              <v-card-text>
                <v-radio :value="getPaymentMethods.cash.identifier" label="Efectivo"></v-radio>
              </v-card-text>
            </template>

            <!--BANK_TRANSFER-->
            <template v-if="getPaymentMethods && getPaymentMethods.bankTransfer.enable">
              <v-divider></v-divider>
              <v-card-text>
                <v-radio :value="getPaymentMethods.bankTransfer.identifier" label="Transferencia Bancaria"></v-radio>
                <v-alert
                    v-if="value === getPaymentMethods.bankTransfer.identifier && getPaymentMethods.bankTransfer.info "
                    type="info"
                >
                  {{ getPaymentMethods.bankTransfer.info }}
                </v-alert>
              </v-card-text>
            </template>

            <!--MP_TRANSFER-->
            <template v-if="getPaymentMethods && getPaymentMethods.mercadoPagoTransfer.enable">
              <v-divider></v-divider>
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
            :text="submitText"
            @click="$emit('confirm')"
            :disabled="!this.value"
        ></submit-button>
      </v-col>

    </template>

    <v-col v-else cols="12" sm="8" md="8" class="px-6">
      <loading></loading>
    </v-col>


  </v-row>
</template>

<script>
import {Loading, SubmitButton} from "@dracul/common-frontend"
export default {
  name: "PaymentMethod",
  components: {Loading,SubmitButton},
  props: {
    value: {type: String},
    submitText: {type: String, default: 'common.next'},
  },
  computed: {
    localValue:{
      get(){
        return this.value
      },
      set(val){
        this.$emit('input',val)
      }
    },
    getPaymentMethods() {
      return this.$store.getters.getPaymentMethods
    }
  },
  created() {
    if (this.getPaymentMethods === null) {
      this.$store.dispatch('findPaymentMethods')
    }
  },
}
</script>

<style scoped>

</style>
