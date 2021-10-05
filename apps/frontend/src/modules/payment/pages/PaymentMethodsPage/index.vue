<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pa-3">
        <payment-methods-form/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentMethodsForm from "@/modules/payment/pages/PaymentMethodsPage/PaymentMethodsForm/PaymentMethodsForm";

export default {
  name: "Method",
  components: {PaymentMethodsForm},

}
</script>

<style scoped>

</style>

