<template>
  <v-card height="100%">
    <v-card-title class="py-2">Pago</v-card-title>
    <v-row>

      <v-col cols="12">
        <payment-data
            :payment-method="$store.getters.getOrderPayment.method"
            :amount="$store.getters.getAmountTotal"
        ></payment-data>
      </v-col>

      <v-col cols="12" class="text-center">
        <upload-receipt auto-submit @fileUploaded="onFileUploaded" />
      </v-col>

      <v-col cols="12" class="text-right pr-6">
        <span>Prefiero pagar en </span>
        <span
            class="blue--text text--darken-4 text-lowercase"
            :style="{cursor:'pointer'}"
            @click="showConfirmDialog()"
        > efectivo</span>
      </v-col>

    </v-row>

    <confirm-dialog
        v-model="confirmDialog"
        description="¿Esta seguro de cambiar el método de pago a efectivo?"
        @confirmed="changePaymentMethod"
    ></confirm-dialog>
  </v-card>


</template>

<script>
import {ConfirmDialog} from "@dracul/common-frontend"
import PaymentData from "@/modules/payment/components/PaymentData/PaymentData";
import UploadReceipt from "@/modules/payment/components/UploadReceipt/UploadReceipt";

export default {
  name: "OrderPaymentReceiptFile",
  components: {UploadReceipt, PaymentData, ConfirmDialog},
  computed: {
    getComprobante() {
      return this.$store.getters.getOrderPayment.receiptFile
    },
    isPdf() {
      return /\.pdf/.test(this.getComprobante)
    }
  },
  methods: {
    onFileUploaded(file) {
      this.$store.dispatch('updateOrderReceiptFile', file.url)
          .then(order => {
            this.$emit('orderModified', order)
          })
    },
    showConfirmDialog() {
      this.confirmDialog = true
    },
    changePaymentMethod() {
      this.$store.dispatch('updateOrderPaymentMethod', this.methodToChange)
          .then(order => {
            this.$emit('orderModified', order)
          })
    },
  },
  data() {
    return {
      confirmDialog: false,
      methodToChange: 'CASH',
      loading: false
    }
  }
}
</script>

<style scoped>

</style>
