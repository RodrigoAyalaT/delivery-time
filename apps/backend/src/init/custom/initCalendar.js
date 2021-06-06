import {createCalendar, findCalendarByIdentifier} from "../../modules/calendar/services/CalendarService";


const calendar = {
    name: 'Horario de atención',
    description: '',
    identifier: 'horario-atencion',
    user: null,
    priority: 1,
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

export const initCalendar = async function () {
        let theCalendar = await findCalendarByIdentifier(calendar.identifier)
        if (!theCalendar) {
            await createCalendar(null, calendar)
        }
}
