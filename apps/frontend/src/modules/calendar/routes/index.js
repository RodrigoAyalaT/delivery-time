import CalendarManagementPage from '../pages/CalendarManagementPage'
import CalendarPage from '../pages/CalendarPage'

const routes = [
     {name: 'CalendarManagementPage', path: '/calendar-management', component: CalendarManagementPage},
     {name: 'CalendarPage', path: '/calendar/:id', component: CalendarPage},
     {name: 'CalendarSchedulePage', path: '/calendar/schedule/:identifier', component: CalendarPage},
]

export default routes;
