<template>
  <crud-create :open="open"
               :loading="loading"
               :title="title"
               :errorMessage="errorMessage"
               @create="create"
               @close="$emit('close')"
  >
    <calendar-form ref="form" v-model="form" :input-errors="inputErrors"/>
  </crud-create>
</template>

<script>

import CalendarProvider from "../../../providers/CalendarProvider";

import {CrudCreate, ClientError} from '@dracul/common-frontend'

import CalendarForm from "../../../components/CalendarForm";

export default {
  name: "CalendarCreate",

  components: {CalendarForm, CrudCreate},

  props: {
    open: {type: Boolean, default: true}
  },

  data() {
    return {
      title: 'calendar.calendar.creating',
      errorMessage: '',
      inputErrors: {},
      loading: false,
      form: {
        name: '',
        description: '',
        identifier: '',
        user: null,
        priority: null,
        schedule: [
          {dayOfWeek: 1, dayName: 'monday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 2, dayName: 'thursday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 3, dayName: 'wednesday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 4, dayName: 'tuesday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 5, dayName: 'friday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 6, dayName: 'saturday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 0, dayName: 'sunday', activeHours: [{from: '00:00', to: '00:00'}]},
        ]
      }
    }
  },

  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.loading = true
        CalendarProvider.createCalendar(this.form).then(r => {
              if (r) {
                this.$emit('itemCreated', r.data.calendarCreate)
                this.$emit('close')
              }
            }
        ).catch(error => {
          let clientError = new ClientError(error)
          this.inputErrors = clientError.inputErrors
          this.errorMessage = clientError.i18nMessage
        }).finally(() => this.loading = false)
      }

    }

  },
}
</script>

<style scoped>

</style>

