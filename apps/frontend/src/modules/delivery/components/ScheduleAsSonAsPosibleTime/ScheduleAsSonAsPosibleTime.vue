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
    calendar: {type: Object, required: true}
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
    getPreparationTime() {
      return this.$store.getters.getSetting('PreparationTime').value
    },
    getTime() {
      let now = Dayjs()
      now = now.add(this.getPreparationTime, 'm')
      return now.format('HH:mm')
    }
  }
}
</script>

<style scoped>

</style>
