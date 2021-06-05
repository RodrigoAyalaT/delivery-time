import {Dayjs} from "@dracul/dayjs-frontend";

export default {
    methods: {
        getHour() {
            return Dayjs().format("HH:mm")
        },
        getDayOfWeek() {
            return Dayjs().day()
        },
        calendarIsActive(calendar) {
            let hour = this.getHour()
            let dayOfWeek = this.getDayOfWeek()
            let result = false
            calendar.schedule.forEach(schedule => {
                if (schedule.dayOfWeek == dayOfWeek) {
                    schedule.activeHours.forEach(activeHours => {
                        if (activeHours.from < hour && activeHours.to > hour) {
                            result = true
                        }
                    })
                }
            })
            return result
        }
    }
}
