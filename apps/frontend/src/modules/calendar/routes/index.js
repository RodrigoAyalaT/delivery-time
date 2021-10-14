import CalendarManagementPage from '../pages/CalendarManagementPage'
import CalendarPage from '../pages/CalendarPage'

const routes = [
     {
          name: 'CalendarManagementPage',
          path: '/calendar-management',
          component: CalendarManagementPage,
          meta: {
               requiresAuth: true,
               permission: "CALENDAR_UPDATE"
          }
     },
     {
          name: 'CalendarPage',
          path: '/calendar/:id',
          component: CalendarPage,
          meta: {
               requiresAuth: true,
               permission: "CALENDAR_UPDATE"
          }
     },
     {
          name: 'CalendarSchedulePage',
          path: '/calendar/schedule/:identifier',
          component: CalendarPage,
          meta: {
               requiresAuth: true,
               permission: "CALENDAR_UPDATE"
          }
     },
]

export default routes;
