<template>
  <v-alert type="info" class="text-left" rounded text outlined>
    {{ $t('delivery.mode.estimatedTime', {hour: getTime}) }}
  </v-alert>
</template>

<script>
import {Dayjs} from "@dracul/dayjs-frontend"
import CalendarIsActive from "@/modules/calendar/mixins/CalendarIsActive";

export default {
  name: "ScheduleAsSonAsPosibleTime",
  mixins: [CalendarIsActive],
  props: {
    value: {type: String},
    calendar: {type: Object, required: true},
    enableDeliveryTime: {type: Boolean, default: false}
  },
  data() {
    return {
      interval: null
    }
  },
  mounted() {
    this.setTime()
    this.interval = setInterval(this.setTime, 10000)
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    setTime() {
      let now = Dayjs()
      now = now.add(this.getPreparationTime, 'm')

      if (this.enableDeliveryTime) {
        now = now.add(this.getDeliveryTime, 'm')
      }
      this.hour = now.format("HH:mm")
    }
  },
  computed: {
    hour: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    },
    getTime() {
      return this.hour ? this.hour : null
    },
    getPreparationTime() {
      return this.$store.getters.getSetting('PreparationTime').value
    },
    getDeliveryTime() {
      return this.$store.getters.getSetting('DeliveryTime').value
    }

  }
}
</script>

<style scoped>

</style>
