<template>
  <v-row justify="center" dense>
    <v-col cols="6" sm="4" md="2">
      <card-button
          :selected="isAsSonAsPosible"
          :title="$t('delivery.mode.asSonAsPosible')"
          icon="bolt"
          @click="asSonAsPosible"
      ></card-button>
    </v-col>
    <v-col cols="6" sm="4" md="2" >
      <card-button
          :selected="isScheduled"
          :title="$t('delivery.mode.scheduledWithdrawal')"

          icon="schedule"
          @click="scheduled"
      ></card-button>
    </v-col>
  </v-row>
</template>

<script>
import CardButton from "@/modules/delivery/components/CardButton/CardButton";
const AS_SON_AS_POSIBLE = 'AS_SON_AS_POSIBLE'
const SCHEDULED = 'SCHEDULED'
export default {
  name: "TakeAwayMode",
  components: {CardButton},
  computed: {
    isAsSonAsPosible() {
      return this.$store.getters.getDeliveryTimeMode == AS_SON_AS_POSIBLE
    },
    isScheduled() {
      return this.$store.getters.getDeliveryTimeMode == SCHEDULED
    }
  },
  methods: {
    isBusinessHours(){
        return true
    },
    asSonAsPosible(){
      this.$store.commit('setOrderDeliveryTimeMode', AS_SON_AS_POSIBLE)
    },
    scheduled(){
      this.$store.commit('setOrderDeliveryTimeMode', SCHEDULED)
    }
  }
}
</script>

<style scoped>

</style>
