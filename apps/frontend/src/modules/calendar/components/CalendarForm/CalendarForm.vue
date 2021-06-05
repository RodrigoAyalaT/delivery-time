<template>
  <v-form ref="form" autocomplete="off" @submit.prevent="save">
    <v-row>

      <v-col cols="12" sm="5">
        <v-text-field

            prepend-icon="edit_calendar"
            name="name"
            v-model="form.name"
            :label="$t('calendar.calendar.labels.name')"
            :placeholder="$t('calendar.calendar.labels.name')"
            :error="hasInputErrors('name')"
            :error-messages="getInputErrors('name')"
            color="secondary"
            :rules="required"
            :disabled="onlySchedule"
        ></v-text-field>
      </v-col>




      <v-col cols="12" sm="5">
        <v-text-field

            prepend-icon="fingerprint"
            name="identifier"
            v-model="form.identifier"
            :label="$t('calendar.calendar.labels.identifier')"
            :placeholder="$t('calendar.calendar.labels.identifier')"
            :error="hasInputErrors('identifier')"
            :error-messages="getInputErrors('identifier')"
            color="secondary"
            :rules="identifierRules"
            :disabled="onlySchedule"
        ></v-text-field>
      </v-col>



      <v-col cols="12" sm="2">
        <v-text-field

            prepend-icon="sort"
            name="priority"
            v-model.number="form.priority"
            type="number"
            :label="$t('calendar.calendar.labels.priority')"
            :placeholder="$t('calendar.calendar.labels.priority')"
            :error="hasInputErrors('priority')"
            :error-messages="getInputErrors('priority')"
            color="secondary"
            :disabled="onlySchedule"
        ></v-text-field>
      </v-col>


      <v-col cols="12" sm="8">
        <v-text-field

            prepend-icon="description"
            name="description"
            v-model="form.description"
            :label="$t('calendar.calendar.labels.description')"
            :placeholder="$t('calendar.calendar.labels.description')"
            :error="hasInputErrors('description')"
            :error-messages="getInputErrors('description')"
            color="secondary"
            :disabled="onlySchedule"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <user-autocomplete
            v-if="!onlySchedule"
            solo
            v-model="form.user"
            :input-errors="inputErrors"
        />
        <user-view v-else-if="form.user" :id="form.user"></user-view>
      </v-col>


      <v-col cols="12">
        <calendar-schedule v-model="form.schedule"></calendar-schedule>
      </v-col>

    </v-row>
  </v-form>
</template>

<script>

import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
import {UserAutocomplete, UserView} from '@dracul/user-frontend'
import CalendarSchedule from "@/modules/calendar/components/CalendarSchedule/CalendarSchedule";


export default {
  name: "CalendarForm",
  mixins: [InputErrorsByProps, RequiredRule],
  components: {CalendarSchedule, UserAutocomplete, UserView},
  props: {
    value: {
      type: Object,
      required: true
    },
    onlySchedule: {type: Boolean, default: false}
  },
  computed: {
    form: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
      identifierRules() {
        return [v =>  /^[a-z0-9-]+$/.test(v) || this.$t('calendar.validation.identifier')];
      },
  },
  watch: {
    form: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>

