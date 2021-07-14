import {Dayjs} from "@dracul/dayjs-frontend";

export default {
    methods: {
        getHour() {
            return Dayjs().format("HH:mm")
        },
        getDayOfWeek() {
            return Dayjs().day()
        },
        calendarIsActive(calendar, hour, dayOfWeek) {

            if(!hour){
                hour = this.getHour()
            }

            if(!dayOfWeek){
                dayOfWeek = this.getDayOfWeek()
            }

            let result = false

            if(calendar.schedule && calendar.schedule.length > 0){
                calendar.schedule.forEach(schedule => {

                    if (schedule.dayOfWeek == dayOfWeek) {
                        schedule.activeHours.forEach(activeHours => {
                            if (activeHours.from <= hour && activeHours.to > hour) {
                                result = true
                            }
                        })
                    }

                })

            }

            return result
        }
    }
}
