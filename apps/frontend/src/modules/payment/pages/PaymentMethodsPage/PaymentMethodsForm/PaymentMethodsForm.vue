<template>
  <v-form ref="form" autocomplete="off" lazy-validation>
    <v-row v-if="paymentMethods">

      <v-col cols="12">
        <h3>{{ $t('payment.method.formTitle') }}</h3>
      </v-col>

      <v-col cols="12">
        <v-text-field

            prepend-icon="title"
            name="title"
            v-model="paymentMethods.title"
            :label="$t('payment.method.labels.title')"
            :placeholder="$t('payment.method.labels.title')"
            :error="hasInputErrors('title')"
            :error-messages="getInputErrors('title')"
            color="secondary"

        ></v-text-field>
      </v-col>

      <!--CASH-->
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ paymentMethods.cash.label }}</v-card-title>
          <v-card-subtitle>Identifier: {{ paymentMethods.cash.identifier }}</v-card-subtitle>
          <v-card-text>
            <v-switch
                v-model="paymentMethods.cash.enable"
                :label="$t('payment.method.labels.enable')"
            />
            <v-text-field
                prepend-icon="info"
                name="cashinfo"
                v-model="paymentMethods.cash.info"
                :label="$t('payment.method.labels.info')"
                :placeholder="$t('payment.method.labels.info')"
                :error="hasInputErrors('cash.info')"
                :error-messages="getInputErrors('cash.info')"
                color="secondary"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <!--BANK TRANSFER-->
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ paymentMethods.bankTransfer.label }}</v-card-title>
          <v-card-subtitle>Identifier: {{ paymentMethods.bankTransfer.identifier }}</v-card-subtitle>
          <v-card-text>
            <v-switch
                v-model="paymentMethods.bankTransfer.enable"
                :label="$t('payment.method.labels.enable')"
            />
            <v-text-field
                prepend-icon="info"
                name="bankTransferinfo"
                v-model="paymentMethods.bankTransfer.info"
                :label="$t('payment.method.labels.info')"
                :placeholder="$t('payment.method.labels.info')"
                :error="hasInputErrors('bankTransfer.info')"
                :error-messages="getInputErrors('bankTransfer.info')"
                color="secondary"
            ></v-text-field>

            <v-text-field
                prepend-icon="account_balance"
                name="bankTransferCBU"
                v-model="paymentMethods.bankTransfer.cbu"
                label="CBU"
                placeholder="CBU"
                :error="hasInputErrors('bankTransfer.cbu')"
                :error-messages="getInputErrors('bankTransfer.cbu')"
                color="secondary"
            ></v-text-field>

            <v-text-field
                prepend-icon="account_balance"
                name="bankTransferAlias"
                v-model="paymentMethods.bankTransfer.alias"
                label="Alias"
                placeholder="Alias"
                :error="hasInputErrors('bankTransfer.alias')"
                :error-messages="getInputErrors('bankTransfer.alias')"
                color="secondary"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <!--MP TRANSFER-->
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ paymentMethods.mercadoPagoTransfer.label }}</v-card-title>
          <v-card-subtitle>Identifier: {{ paymentMethods.mercadoPagoTransfer.identifier }}</v-card-subtitle>
          <v-card-text>
            <v-switch
                v-model="paymentMethods.mercadoPagoTransfer.enable"
                :label="$t('payment.method.labels.enable')"
            />
            <v-text-field
                prepend-icon="info"
                name="mercadoPagoTransferinfo"
                v-model="paymentMethods.mercadoPagoTransfer.info"
                :label="$t('payment.method.labels.info')"
                :placeholder="$t('payment.method.labels.info')"
                :error="hasInputErrors('cash.info')"
                :error-messages="getInputErrors('cash.info')"
                color="secondary"
            ></v-text-field>

            <v-text-field
                prepend-icon="account_balance"
                name="mercadoPagoTransferCVU"
                v-model="paymentMethods.mercadoPagoTransfer.cvu"
                label="CVU"
                placeholder="CVU"
                :error="hasInputErrors('mercadoPagoTransfer.cvu')"
                :error-messages="getInputErrors('mercadoPagoTransfer.cvu')"
                color="secondary"
            ></v-text-field>

            <v-text-field
                prepend-icon="account_balance"
                name="mercadoPagoTransferAlias"
                v-model="paymentMethods.mercadoPagoTransfer.alias"
                label="Alias"
                placeholder="Alias"
                :error="hasInputErrors('mercadoPagoTransfer.alias')"
                :error-messages="getInputErrors('mercadoPagoTransfer.alias')"
                color="secondary"
            ></v-text-field>

          </v-card-text>

          <v-card-actions>
            <v-btn class="primary onPrimary--text" @click="save">
              {{ $t('common.save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>
    <snackbar v-model="snackbar" ></snackbar>
  </v-form>
</template>

<script>

import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
import {Snackbar} from "@dracul/common-frontend"


export default {
  name: "PaymentMethodsForm",
  mixins: [InputErrorsByProps, RequiredRule],
  components: {Snackbar},
  computed: {
    paymentMethods: {
      get() {
        return this.$store.getters.getPaymentMethods
      },
      set(val) {
        this.$store.commit('setPaymentMethod', val)
      }
    }
  },
  created() {
    if (this.paymentMethods === null) {
      this.$store.dispatch('findPaymentMethods')
    }
  },
  watch: {
    form: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    save() {
      this.$store.dispatch('updatePaymentMethods')
          .then(() => {
            this.snackbar = "Guardado exitoso"
          })
    }
  },
  data() {
    return {
      snackbar: null
    }
  }
}
</script>

<style scoped>

</style>

