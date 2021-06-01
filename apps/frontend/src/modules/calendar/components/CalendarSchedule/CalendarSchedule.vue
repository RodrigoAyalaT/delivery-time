<template>
  <v-container fluid>
    <v-card v-for="item in items" :key="item.dayOfWeek" class="my-5">
      <v-card-title>
        {{item.dayName}} ({{item.dayOfWeek}})
      </v-card-title>
      <v-card-text>
        <input-from-to v-model="item.activeHours"></input-from-to>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
import InputFromTo from "@/modules/calendar/components/InputFromTo/InputFromTo";

export default {
  name: "CalendarSchedule",
  components: {InputFromTo},
  mixins: [InputErrorsByProps, RequiredRule],
  props: {
    value: {
      type: Array,
      required: true,
      validator: propValue => {
        propValue.forEach(sc => {
          if (sc.dayOfWeek === undefined || sc.dayName === undefined || sc.activeHours === undefined) {
            return false
          }
        })
        return true
      }
    },
  },
  computed: {
    items: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    items: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
}
</script>

<style scoped>

</style>
