import {createCalendar, findCalendarByIdentifier} from "../../modules/calendar/services/CalendarService";


const calendar = {
    name: 'Horario de atención',
    description: '',
    identifier: 'horario-atencion',
    user: null,
    priority: 1,
    schedule: [
        {dayOfWeek: 1, dayName: 'Monday', activeHours: [{from: '00:00', to: '00:00'}]},
        {dayOfWeek: 2, dayName: 'Thursday', activeHours: [{from: '00:00', to: '00:00'}]},
        {dayOfWeek: 3, dayName: 'Wednesday', activeHours: [{from: '00:00', to: '00:00'}]},
        {dayOfWeek: 4, dayName: 'Tuesday', activeHours: [{from: '00:00', to: '00:00'}]},
        {dayOfWeek: 5, dayName: 'Friday', activeHours: [{from: '00:00', to: '00:00'}]},
        {dayOfWeek: 6, dayName: 'Saturday', activeHours: [{from: '00:00', to: '00:00'}]},
        {dayOfWeek: 7, dayName: 'Sunday', activeHours: [{from: '00:00', to: '00:00'}]},
    ]
}

export const initCalendar = async function () {
        let theCalendar = await findCalendarByIdentifier(calendar.identifier)
        if (!theCalendar) {
            await createCalendar(null, calendar)
        }
}
