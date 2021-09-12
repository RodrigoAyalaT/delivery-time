<template>
  <v-container fluid class="pt-0">

    <show-order v-if="orderIdentifier" :identifier="orderIdentifier"></show-order>

    <order-confirmation v-else-if="toConfirm" @orderCreated="onOrderCreated"></order-confirmation>

    <v-row v-else>
      <v-col cols="12" md="4" style="border-right: gainsboro 1px solid;">
        <contact-form dense></contact-form>
        <order-mode dense @confirm="toConfirm=true"></order-mode>
      </v-col>

      <v-col cols="12" md="8" style="border-right: gainsboro 1px solid;">
        <product-gallery-tabs dense></product-gallery-tabs>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import OrderMode from "@/modules/delivery/components/OrderMode/OrderMode";
import ContactForm from "@/modules/delivery/components/ContactForm/ContactForm";
import ProductGalleryTabs from "@/modules/delivery/components/ProductGalleryTabs/ProductGalleryTabs";
import OrderConfirmation from "@/modules/delivery/components/OrderConfirmation/OrderConfirmation";
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
  methods: {
    onOrderCreated(orderIdentifier){
      this.orderIdentifier = orderIdentifier
    },
    newOrder(){
      this.$store.commit("clearOrderContact")
    }
  }
}
</script>

<style scoped>

</style>
