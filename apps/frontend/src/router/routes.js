import merge from 'deepmerge'
import baseRoutes from '../modules/base/routes'
import deliveryRoutes from '../modules/delivery/routes'
import mapsRoutes from '../modules/maps/routes'
import calendarRoutes from '../modules/calendar/routes'
import paymentRoutes from '../modules/payment/routes'

import {routes as settingsRoutes} from '@dracul/settings-frontend'
import {routes as userRoutes} from '@dracul/user-frontend'
import {routes as customRoutes} from '@dracul/customize-frontend'
import {routes as notificationRoutes} from '@dracul/notification-frontend'

const routes = merge.all([baseRoutes, settingsRoutes, deliveryRoutes, mapsRoutes, calendarRoutes, paymentRoutes, userRoutes, notificationRoutes, customRoutes])


export default routes;
