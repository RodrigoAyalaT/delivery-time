<template>
  <card-edit v-if="$store.getters.isSettingsReady" @edit="$emit('edit')">
    <order-location :order="$store.getters.getOrder"
                    divider
                    flat
    ></order-location>
  </card-edit>
</template>

<script>
import CardEdit from "@/modules/delivery/components/CardEdit/CardEdit";
import OrderLocation from "@/modules/delivery/components/OrderLocation/OrderLocation";

export default {
  name: "OrderReviewLocation",
  components: {OrderLocation, CardEdit},

}
</script>

<style scoped>

</style>
