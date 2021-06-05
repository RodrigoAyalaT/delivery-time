<template>
  <crud-update :open="open"
               :loading="loading"
               :title="title"
               :errorMessage="errorMessage"
               @update="update"
               @close="$emit('close')"
               fullscreen
  >
    <calendar-form ref="form" v-model="form" :input-errors="inputErrors"/>
  </crud-update>
</template>

<script>

import CalendarProvider from "../../../providers/CalendarProvider";

import {CrudUpdate, ClientError} from '@dracul/common-frontend'

import CalendarForm from "../../../components/CalendarForm";

export default {
  name: "CalendarUpdate",

  components: {CalendarForm, CrudUpdate},

  props: {
    open: {type: Boolean, default: true},
    item: {type: Object, required: true}
  },

  data() {
    return {
      title: 'calendar.calendar.editing',
      errorMessage: '',
      inputErrors: {},
      loading: false,
      form: {
        id: this.item.id,
        name: this.item.name,
        description: this.item.description,
        identifier: this.item.identifier,
        user: this.item.user ? this.item.user.id : null,
        priority: this.item.priority,
        schedule: this.item.schedule ? this.cleanTypename(this.item.schedule) : [
          {dayOfWeek: 1, dayName: 'Monday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 2, dayName: 'Thursday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 3, dayName: 'Wednesday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 4, dayName: 'Tuesday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 5, dayName: 'Friday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 6, dayName: 'Saturday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 7, dayName: 'Sunday', activeHours: [{from: '00:00', to: '00:00'}]},
        ]
      }
    }
  },
  methods: {
    cleanTypename(schedules){
      schedules.forEach(schedule => {
        delete schedule.__typename
        schedule.activeHours.forEach(ah => {
          delete ah.__typename
        })
      })
      return schedules
    },
    update() {
      if (this.$refs.form.validate()) {
        this.loading = true
        CalendarProvider.updateCalendar(this.form).then(r => {
              if (r) {
                this.$emit('itemUpdated', r.data.calendarUpdate)
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

