<template>
  <v-row justify="center" dense>

    <template v-if="isActiveHours">
      <v-col cols="6" sm="4" md="2">
        <card-button
            :selected="isAsSonAsPosible"
            :title="$t('delivery.mode.asSonAsPosible')"
            icon="bolt"
            @click="asSonAsPosible"
        ></card-button>
      </v-col>
      <v-col cols="6" sm="4" md="2">
        <card-button
            :selected="isScheduled"
            :title="$t('delivery.mode.scheduledWithdrawal')"

            icon="schedule"
            @click="scheduled"
        ></card-button>
      </v-col>
    </template>

    <template v-else>
      <v-col cols="6" sm="8" md="4">
        <v-alert type="warning" dense class="align-center">
          "Lo sentimos, el local esta cerrado, podes programar el retiro de tu pedido"
        </v-alert>
        <schedule-time></schedule-time>
        <submit-button></submit-button>
      </v-col>

    </template>

  </v-row>
</template>

<script>
import CardButton from "@/modules/delivery/components/CardButton/CardButton";
import CalendarIsActive from "@/modules/calendar/mixins/CalendarIsActive";
import ScheduleTime from "@/modules/delivery/components/ScheduleTime/ScheduleTime";
import {SubmitButton} from "@dracul/common-frontend"

const AS_SON_AS_POSIBLE = 'AS_SON_AS_POSIBLE'
const SCHEDULED = 'SCHEDULED'
export default {
  name: "TakeAwayMode",
  components: {ScheduleTime, CardButton, SubmitButton},
  mixins: [CalendarIsActive],
  props: {
    calendar: {type: Object, required: true}
  },
  data() {
    return {
      isActiveHours: null
    }
  },
  computed: {
    isAsSonAsPosible() {
      return this.$store.getters.getDeliveryTimeMode == AS_SON_AS_POSIBLE
    },
    isScheduled() {
      return this.$store.getters.getDeliveryTimeMode == SCHEDULED
    }
  },
  created() {
    this.determineActiveHours()
  },
  methods: {
    determineActiveHours() {
      this.isActiveHours = this.calendarIsActive(this.calendar)
    },
    isBusinessHours() {
      return true
    },
    asSonAsPosible() {
      this.$store.commit('setOrderDeliveryTimeMode', AS_SON_AS_POSIBLE)
    },
    scheduled() {
      this.$store.commit('setOrderDeliveryTimeMode', SCHEDULED)
    }
  }
}
</script>

<style scoped>

</style>
