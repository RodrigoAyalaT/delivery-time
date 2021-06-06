<template>
  <v-row justify="center" dense>

    <v-col cols="12">
      <v-row justify="center" dense>
        <v-col cols="12" sm="8" md="8">
          <location-form
              v-model="form"
              enable-map
          ></location-form>
        </v-col>

      </v-row>
    </v-col>

    <v-col v-if="!isActiveHours || isScheduled" cols="12">
      <v-row justify="center" dense>
        <v-col cols="6" sm="8" md="4">
          <v-alert v-if="!isActiveHours && !isScheduled"
                   type="warning"
                   class="text-left"
                   rounded
                   text
                   outlined
                   prominent
          >
            {{ getMessageOutOfTime }}
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
      <submit-button :text="$t('common.confirm')" @click="$emit('confirm')"></submit-button>
    </v-col>

  </v-row>
</template>

<script>
import CalendarIsActive from "@/modules/calendar/mixins/CalendarIsActive";
import ScheduleTime from "@/modules/delivery/components/ScheduleTime/ScheduleTime";
import {SubmitButton} from "@dracul/common-frontend"
import ScheduleAsSonAsPosibleTime
  from "@/modules/delivery/components/ScheduleAsSonAsPosibleTime/ScheduleAsSonAsPosibleTime";
import LocationForm from "@/modules/maps/components/LocationForm/LocationForm";

const AS_SON_AS_POSIBLE = 'AS_SON_AS_POSIBLE'
const SCHEDULED = 'SCHEDULED'
export default {
  name: "OrderModeDelivery",
  components: {LocationForm, ScheduleAsSonAsPosibleTime, ScheduleTime, SubmitButton},
  mixins: [CalendarIsActive],
  props: {
    calendar: {type: Object, required: true}
  },
  data() {
    return {
      isActiveHours: null,
      form: {
        address: '',
        floor: '',
        apartment: '',
        latitude: null,
        longitude: null,
        country: '',
        province: '',
        locality: '',
        postalCode: ''
      }
    }
  },
  computed: {
    getMessageOutOfTime() {
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
    },
    setDeliveryTime(val) {
      this.$store.commit('setOrderDeliveryTime', val)
    }
  }
}
</script>

<style scoped>

</style>
