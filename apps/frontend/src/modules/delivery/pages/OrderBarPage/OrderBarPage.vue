<template>
  <v-container fluid class="pt-0">

    <template v-if="this.$store.getters.getCurrentOrderIdentifier">
      <v-btn @click="clearOrder" class="my-3">Nueva Orden</v-btn>
      <v-divider></v-divider>
      <show-order
          :identifier="this.$store.getters.getCurrentOrderIdentifier">
      </show-order>
    </template>


    <order-review v-else-if="toConfirm" @orderCreated="onOrderCreated"></order-review>

    <v-row v-else>
      <v-col cols="12" md="4" style="border-right: gainsboro 1px solid;">
        <order-mode dense @confirm="toConfirm=true"></order-mode>
        <contact-form dense :email-required="false"></contact-form>

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
import OrderReview from "@/modules/delivery/components/OrderReview/OrderReview";
import ShowOrder from "@/modules/delivery/components/ShowOrder/ShowOrder";
export default {
  name: "OrderBarPage",
  components: {ShowOrder, OrderReview, ProductGalleryTabs, ContactForm, OrderMode},
  data(){
    return {
      toConfirm: false,
    }
  },
  created() {
    this.$store.dispatch('initOrderIfIsNull')
    this.clearOrder()
    this.$store.commit('setOrderOrigin','BAR')
  },
  methods: {
    onOrderCreated(orderIdentifier){
      this.orderIdentifier = orderIdentifier
      this.$router.push({name: 'OrderViewPage',params: {identifier: this.orderIdentifier}})
    },
    clearOrder(){
      this.toConfirm = false
      this.$store.dispatch("resetOrder")
      this.$store.dispatch('resetOrderContact')
    }
  }
}
</script>

<style scoped>

</style>
