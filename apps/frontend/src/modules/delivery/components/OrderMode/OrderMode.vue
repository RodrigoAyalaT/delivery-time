<template>

  <v-row v-if="!$store.getters.isSettingsReady"
         dense
         class="py-1 px-0"
         justify="center" align="center"
  >

    <v-col cols="12">
      <loading ></loading>
    </v-col>
  </v-row>

  <v-row v-else
         dense
         class="py-1 px-0"
         justify="center"
         align="center"
  >

    <v-col v-if="!dense" cols="12"  class="text-left">
      <h3>¿Como quisieras recibir tu pedido?</h3>
    </v-col>

    <v-col cols="6">
      <card-button
          :selected="isTakeAway"
          :title="$t('delivery.mode.takeAway')"
          icon="store"
          @click="takeAway"
          :dense="dense"
      ></card-button>
    </v-col>

    <v-col cols="6">
      <card-button
          :selected="isDelivery"
          :title="$t('delivery.mode.delivery')"
          icon="delivery_dining"
          @click="delivery"
          :dense="dense"
      ></card-button>
    </v-col>

    <!--TAKE_AWAY-->
    <v-col cols="12"
           v-if="isTakeAway"
           class="text-center px-0"
    >
      <loading v-if="loading"></loading>
      <order-mode-take-away
          v-if="calendar"
          :calendar="calendar"
          @confirm="$emit('confirm')"
          :dense="dense"

      ></order-mode-take-away>
    </v-col>

    <!--DELIVERY-->
    <v-col cols="12"
           v-if="isDelivery"
           class="text-center px-0"
    >
      <loading v-if="loading"></loading>
      <order-mode-delivery
          v-if="calendar"
          :calendar="calendar"
          @confirm="$emit('confirm')"
          :dense="dense"
      ></order-mode-delivery>
    </v-col>

  </v-row>
</template>

<script>
import OrderModeTakeAway from "@/modules/delivery/components/OrderModeTakeAway";
import CardButton from "@/modules/delivery/components/CardButton/CardButton";
import CalendarProvider from "@/modules/calendar/providers/CalendarProvider";
import {Loading} from '@dracul/common-frontend'
import OrderModeDelivery from "@/modules/delivery/components/OrderModeDelivery/OrderModeDelivery";

const TAKE_AWAY = 'TAKE_AWAY'
const DELIVERY = 'DELIVERY'

export default {
  name: "OrderMode",
  components: {OrderModeDelivery, CardButton, OrderModeTakeAway, Loading},
  props: {
    dense: {type: Boolean, default: false},
  },
  data() {
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
      this.$store.commit('clearOrderLocation')
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
