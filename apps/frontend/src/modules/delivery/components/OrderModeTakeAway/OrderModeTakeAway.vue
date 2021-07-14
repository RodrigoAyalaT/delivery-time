<template>
  <v-row justify="center" dense>

    <v-col v-if="isActiveHours" cols="12">
      <v-row justify="center" dense>
        <v-col cols="6" sm="8" md="2">
          <card-button
              :selected="isAsSonAsPosible"
              :title="$t('delivery.mode.asSonAsPosible')"
              icon="bolt"
              @click="asSonAsPosible"
          ></card-button>
        </v-col>
        <v-col cols="6" sm="8" md="2">
          <card-button
              :selected="isScheduled"
              :title="$t('delivery.mode.scheduledWithdrawal')"

              icon="schedule"
              @click="scheduled"
          ></card-button>
        </v-col>
      </v-row>
    </v-col>

    <v-col v-if="!isActiveHours || isScheduled" cols="12">
      <v-row justify="center" dense>
        <v-col cols="6" sm="8" md="4">
          <v-alert v-if="!isActiveHours"
                   type="warning"
                   class="text-left"
                   rounded
                   text
                   outlined
                   prominent
          >
            {{getMessageOutOfTime}}
          </v-alert>
          <schedule-time v-model="time" :calendar="calendar"></schedule-time>
        </v-col>
      </v-row>
    </v-col>

    <v-col v-if="isActiveHours && isAsSonAsPosible" cols="12">
      <v-row justify="center" dense>
        <v-col cols="6" sm="8" md="4">
        <schedule-as-son-as-posible-time v-model="time" :calendar="calendar"></schedule-as-son-as-posible-time>
        </v-col>
      </v-row>
    </v-col>

    <v-col v-if="time" cols="12">
      <submit-button :text="'common.next'" @click="$emit('confirm')"></submit-button>
    </v-col>

  </v-row>
</template>

<script>
import CardButton from "@/modules/delivery/components/CardButton/CardButton";
import CalendarIsActive from "@/modules/calendar/mixins/CalendarIsActive";
import ScheduleTime from "@/modules/delivery/components/ScheduleTime/ScheduleTime";
import {SubmitButton} from "@dracul/common-frontend"
import ScheduleAsSonAsPosibleTime
  from "@/modules/delivery/components/ScheduleAsSonAsPosibleTime/ScheduleAsSonAsPosibleTime";

const AS_SON_AS_POSIBLE = 'AS_SON_AS_POSIBLE'
const SCHEDULED = 'SCHEDULED'
export default {
  name: "OrderModeTakeAway",
  components: {ScheduleAsSonAsPosibleTime, ScheduleTime, CardButton, SubmitButton},
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
    getMessageOutOfTime(){
      return this.$store.getters.getSetting('MessageOutOfTime').value
    },
    isAsSonAsPosible() {
      return this.$store.getters.getDeliveryTimeMode == AS_SON_AS_POSIBLE
    },
    isScheduled() {
      return this.$store.getters.getDeliveryTimeMode == SCHEDULED
    },
    time: {
      get() {
        return this.$store.getters.getDeliveryTime
      },
      set(v) {
        this.setDeliveryTime(v)
      }
    }
  },
  created() {
    this.determineActiveHours()
    this.setShopLocation()
  },
  methods: {
    determineActiveHours() {
      this.isActiveHours = this.calendarIsActive(this.calendar)
      if(!this.isActiveHours){
        this.scheduled()
      }
    },
    isBusinessHours() {
      return true
    },
    asSonAsPosible() {
      this.$store.commit('setOrderDeliveryTimeMode', AS_SON_AS_POSIBLE)
    },
    scheduled() {
      this.$store.commit('setOrderDeliveryTimeMode', SCHEDULED)
    },
    setDeliveryTime(val) {
      this.$store.commit('setOrderDeliveryTime', val)
    },
    setShopLocation(){
      this.$store.commit('clearLocation')
      this.$store.commit('setOrderLocationAddress', this.$store.getters.getSetting('ShopAddress').value)
    }
  }
}
</script>

<style scoped>

</style>
