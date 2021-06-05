<template>
  <v-row justify="center">
    <v-col>
      <v-tabs v-model="tab" show-arrows grow>
        <v-tabs-slider color="onSecondary"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item.dayOfWeek" class="secondary onSecondary--text">

          {{ item.dayName }} ({{ item.dayOfWeek }})
        </v-tab>

      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
            v-for="item in items" :key="item.dayOfWeek"

        >
          <input-from-to v-model="item.activeHours"></input-from-to>
        </v-tab-item>
      </v-tabs-items>


    </v-col>


  </v-row>

</template>

<script>
import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
import InputFromTo from "@/modules/calendar/components/InputFromTo/InputFromTo";

export default {
  name: "CalendarSchedule",
  components: {InputFromTo},
  mixins: [InputErrorsByProps, RequiredRule],
  data() {
    return {
      tab: 0
    }
  },
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
