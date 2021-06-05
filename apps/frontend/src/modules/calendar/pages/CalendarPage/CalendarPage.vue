<template>
  <v-container>
    <loading v-if="loading"></loading>
    <v-card v-else-if="calendar" class="mt-3" :elevation="5">
      <v-card-title>
        {{ $t("calendar.calendar.calendarSchedule") }}
      </v-card-title>
      <v-card-text>
        <calendar-form
            :only-schedule="onlySchedule"
            v-model="calendar"
            ref="form"
        >
        </calendar-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <submit-button @click="update"></submit-button>
      </v-card-actions>


    </v-card>

    <v-alert v-else>No Calendar</v-alert>
    <snackbar v-model="snackbar" :message="$t('common.updated')"></snackbar>
  </v-container>

</template>

<script>
import CalendarProvider from "@/modules/calendar/providers/CalendarProvider";
import {ClientError, Loading, SubmitButton, Snackbar} from "@dracul/common-frontend"
import CalendarForm from "@/modules/calendar/components/CalendarForm/CalendarForm";

export default {
  name: "CalendarPage",
  components: {CalendarForm, Loading, SubmitButton, Snackbar},
  data() {
    return {
      calendar: null,
      loading: false,
      errorMessage: '',
      inputErrors: {},
      snackbar: false
    }
  },
  computed: {
    getCalendarId() {
      return this.$route.params.id
    },
    onlySchedule() {
      if (this.$route.name === 'CalendarSchedulePage') {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.fetchCalendar()
  },
  methods: {
    fetchCalendar() {
      this.loading = true
      CalendarProvider.findCalendar(this.getCalendarId)
          .then(r => {
            this.setCalendar(r.data.calendarFind)
          })
          .catch(e => {
            console.error(e)
          })
          .finally(() => this.loading = false)
    },
    setCalendar(calendar) {
      this.calendar = {
        id: calendar.id,
        name: calendar.name,
        description: calendar.description,
        identifier: calendar.identifier,
        user: calendar.user ? calendar.user.id : null,
        priority: calendar.priority,
        schedule: calendar.schedule ? this.cleanTypename(calendar.schedule) : [
          {dayOfWeek: 1, dayName: 'Monday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 2, dayName: 'Thursday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 3, dayName: 'Wednesday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 4, dayName: 'Tuesday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 5, dayName: 'Friday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 6, dayName: 'Saturday', activeHours: [{from: '00:00', to: '00:00'}]},
          {dayOfWeek: 7, dayName: 'Sunday', activeHours: [{from: '00:00', to: '00:00'}]},
        ]
      }
    },
    cleanTypename(schedules) {
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
        CalendarProvider.updateCalendar(this.calendar).then(r => {
              if (r) {
                this.setCalendar(r.data.calendarUpdate)
                this.snackbar = true
              }
            }
        ).catch(error => {
          let clientError = new ClientError(error)
          this.inputErrors = clientError.inputErrors
          this.errorMessage = clientError.i18nMessage
        }).finally(() => this.loading = false)
      }

    }
  }
}
</script>

<style scoped>

</style>
