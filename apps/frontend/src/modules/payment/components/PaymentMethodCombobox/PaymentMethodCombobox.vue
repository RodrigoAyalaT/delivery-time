<template>

  <v-select
      prepend-icon="account_tree"
      :items="items"
      v-model="localValue"
      :label="$t('payment.paymentMethods')"
      :loading="loading"
      :error="hasInputErrors('state')"
      :error-messages="getInputErrors('state')"
      color="secondary"
      item-color="secondary"
      clearable
  ></v-select>

</template>

<script>

import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'


export default {
  name: "PaymentMethodsCombobox",
  mixins: [InputErrorsByProps, RequiredRule],
  props: {
    value: {type: String},
  },
  data() {
    return {
      paymentMethods: [],
      loading: false,
      items: ['CASH','BANK_TRANSFER','MP_TRANSFER']
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },

}
</script>

<style scoped>

</style>

