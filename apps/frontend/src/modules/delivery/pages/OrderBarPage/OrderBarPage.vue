<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-col cols="12" md="4" style="border-right: gainsboro 1px solid;">
        <contact-form small></contact-form>
        <order-mode small bar></order-mode>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderMode from "@/modules/delivery/components/OrderMode/OrderMode";
import ContactForm from "@/modules/delivery/components/ContactForm/ContactForm";
export default {
  name: "OrderBarPage",
  components: {ContactForm, OrderMode}
}
</script>

<style scoped>

</style>
