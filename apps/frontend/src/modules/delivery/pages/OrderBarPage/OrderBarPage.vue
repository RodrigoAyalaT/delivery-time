<template>
  <v-container fluid class="pt-0">

    <show-order v-if="orderIdentifier" :identifier="orderIdentifier"></show-order>

    <order-confirmation v-else-if="toConfirm" @orderCreated="onOrderCreated"></order-confirmation>

    <v-row v-else>
      <v-col cols="12" md="4" style="border-right: gainsboro 1px solid;">
        <order-mode dense @confirm="toConfirm=true"></order-mode>
        <contact-form dense></contact-form>

      </v-col>

      <v-col cols="12" md="8" style="border-right: gainsboro 1px solid;">
        <product-gallery-tabs dense></product-gallery-tabs>
      </v-col>
      <v-btn class="primary"
             absolute bottom right
             @click="toConfirm=true"
             :disabled="!$store.getters.orderIsReady"
      >
        {{$t('common.confirm')}}
      </v-btn>
    </v-row>



  </v-container>
</template>

<script>
import OrderMode from "@/modules/delivery/components/OrderMode/OrderMode";
import ContactForm from "@/modules/delivery/components/ContactForm/ContactForm";
import ProductGalleryTabs from "@/modules/delivery/components/ProductGalleryTabs/ProductGalleryTabs";
import OrderConfirmation from "@/modules/delivery/components/OrderReview/OrderReview";
import ShowOrder from "@/modules/delivery/components/ShowOrder/ShowOrder";
export default {
  name: "OrderBarPage",
  components: {ShowOrder, OrderConfirmation, ProductGalleryTabs, ContactForm, OrderMode},
  data(){
    return {
      toConfirm: false,
      orderIdentifier: null
    }
  },
  created() {
    this.clearOrder()
  },
  methods: {
    onOrderCreated(orderIdentifier){
      this.orderIdentifier = orderIdentifier
    },
    clearOrder(){
      this.$store.dispatch("resetOrder")
      this.$store.dispatch('resetOrderContact')
    }
  }
}
</script>

<style scoped>

</style>
