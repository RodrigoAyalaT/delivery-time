<template>
  <v-card class="grey--text text--darken-2">
    <template v-if="getComprobante">
      <v-card-title>Comprobante de transferencia</v-card-title>
      <v-card-text class="text-center">
        <object v-if="isPdf"
                :data="getComprobante"
                type="application/pdf" width="300"
                height="200"
        >
          <a :href="getComprobante">comprobante.pdf</a>
        </object>
        <v-img v-else max-width="300" max-height="200" contain :src="getComprobante"/>
      </v-card-text>

    </template>

    <template v-else>
      <v-card-title>Adjuntar comprobante de transferencia</v-card-title>
      <v-card-text class="text-center">
      <file-upload-express @fileUploaded="onFileUploaded" ></file-upload-express>
      <span class="subtitle-1">Adjuntar comprobante</span>
      </v-card-text>
      <v-card-text>
       <!-- Prefiero pagar en efectivo <v-btn>Cambiar a metodo de pago efectivo</v-btn>-->
      </v-card-text>
    </template>

  </v-card>
</template>

<script>
import {FileUploadExpress} from "@dracul/media-frontend"
export default {
  name: "OrderPaymentReceiptFile",
  components: {FileUploadExpress},
  computed:{
    getComprobante(){
       return this.$store.getters.getOrderPayment.receiptFile
    },
    isPdf(){
      return /\.pdf/.test(this.getComprobante)
    }
  },
  methods: {
    onFileUploaded(val){
      this.$store.commit('setOrderPaymentReceiptFile',val.url)
    }
  }
}
</script>

<style scoped>

</style>
