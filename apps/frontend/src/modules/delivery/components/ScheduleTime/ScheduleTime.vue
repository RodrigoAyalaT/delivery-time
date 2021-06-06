<template>
  <v-select
      :items="getOptions"
      v-model="hour"
      :label="$t('Hour')"
      @change="v => $emit('change',v)"
  >

  </v-select>
</template>

<script>
import {Dayjs} from "@dracul/dayjs-frontend"
import CalendarIsActive from "@/modules/calendar/mixins/CalendarIsActive";

export default {
  name: "ScheduleTime",
  mixins: [CalendarIsActive],
  props: {
    value: {type: String},
    calendar: {type: Object, required: true}
  },
  data() {
    return {
    }
  },
  computed: {
    hour: {
      get(){
        return this.value
      },
      set(v){
        this.$emit('input',v)
      }
    },
    getIntervalTime() {
      return this.$store.getters.getSetting('IntervalTime').value
    },
    getPreparationTime() {
      return this.$store.getters.getSetting('PreparationTime').value
    },
    getOptions() {
      let hour = Dayjs().startOf('day')
      let now = Dayjs()
      let tomorrow = hour.add(1, 'day')

      now = now.add(this.getPreparationTime, 'm')

      let working = 0
      let options = []

      while (working < 1440) {

        if (hour.isAfter(now) && this.calendarIsActive(this.calendar, hour.format('HH:mm'))) {
          options.push(hour.format("HH:mm"))
        }

        hour = hour.add(this.getIntervalTime, 'm')

        working++
        if (hour.isAfter(tomorrow)) {
          break
        }
      }

      return options
    }
  }
}
</script>

<style scoped>

</style>
