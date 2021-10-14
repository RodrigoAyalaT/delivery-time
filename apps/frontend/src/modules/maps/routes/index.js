import ZoneManagementPage from '../pages/ZoneManagementPage'
import LocationManagementPage from '../pages/LocationManagementPage'

const routes = [
    {
        name: 'ZoneManagementPage',
        path: '/zone-management',
        component: ZoneManagementPage,
        meta: {
            requiresAuth: true,
            permission: "ZONE_UPDATE"
        }
    },
    {
        name: 'LocationManagementPage',
        path: '/location-management',
        component: LocationManagementPage,
        meta: {
            requiresAuth: true,
            permission: "LOCATION_UPDATE"
        }
    }
]

export default routes;
