<template>
  <v-row dense class="py-1 px-0" justify="center" align="center">

    <v-col cols="6" sm="4" md="2">
      <card-button
          :selected="isTakeAway"
          :title="$t('delivery.mode.takeAway')"
          icon="store"
          @click="takeAway"
      ></card-button>
    </v-col>

    <v-col cols="6" sm="4" md="2">
      <card-button
          :selected="isDelivery"
          :title="$t('delivery.mode.delivery')"
          icon="delivery_dining"
          @click="delivery"
      ></card-button>
    </v-col>

    <v-col cols="12"
           v-if="isTakeAway"
           class="text-center px-0"
    >
      <loading v-if="loading"></loading>
      <take-away-mode v-if="calendar" :calendar="calendar"></take-away-mode>
    </v-col>

  </v-row>
</template>

<script>
import TakeAwayMode from "@/modules/delivery/components/TakeAwayMode/TakeAwayMode";
import CardButton from "@/modules/delivery/components/CardButton/CardButton";
import CalendarProvider from "@/modules/calendar/providers/CalendarProvider";
import {Loading} from '@dracul/common-frontend'
const TAKE_AWAY = 'TAKE_AWAY'
const DELIVERY = 'DELIVERY'

export default {
  name: "DeliveryMode",
  components: {CardButton, TakeAwayMode, Loading},
  data(){
    return {
      calendar: null,
      loading: false
    }
  },
  computed: {
    isTakeAway() {
      return this.$store.getters.getDeliveryMode == TAKE_AWAY
    },
    isDelivery() {
      return this.$store.getters.getDeliveryMode == DELIVERY
    }
  },
  created() {
    this.fetchCalendar()
  },
  methods: {
    takeAway() {
      this.$store.commit('setOrderDeliveryMode', TAKE_AWAY)
    },
    delivery() {
      this.$store.commit('setOrderDeliveryMode', DELIVERY)
    },
    fetchCalendar() {
      this.loading = true
      const HORARIO_ATENCION = 'horario-atencion'
      CalendarProvider.findCalendarByIdentifier(HORARIO_ATENCION)
          .then(r => {
            this.calendar = r.data.calendarFindByIdentifier
          })
          .catch(e => {
            console.error(e)
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>

<style scoped>

</style>
