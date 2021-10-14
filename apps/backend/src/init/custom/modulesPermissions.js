/* ADD YOUR MODULE PERMISSIONS HERE */

import {
    BASE_SHOW
} from '../../modules/base/permissions'

import {
    permissions as settingsPermissions
} from '@dracul/settings-backend'

import {
    PRODUCT_CREATE,
    PRODUCT_DELETE,
    PRODUCT_SHOW,
    PRODUCT_UPDATE
} from '../../modules/delivery/permissions/Product'

import {
    PRODUCTCATEGORY_CREATE,
    PRODUCTCATEGORY_DELETE,
    PRODUCTCATEGORY_SHOW,
    PRODUCTCATEGORY_UPDATE
} from '../../modules/delivery/permissions/ProductCategory'

import {
    INGREDIENT_CREATE,
    INGREDIENT_DELETE,
    INGREDIENT_SHOW,
    INGREDIENT_UPDATE
} from '../../modules/delivery/permissions/Ingredient'

import {
    ORDER_CREATE,
    ORDER_DELETE,
    ORDER_SHOW,
    ORDER_UPDATE,
    MY_DELIVERY_ORDERS,
    ORDER_SHOW_BAR,
    ORDER_SHOW_KITCHEN
} from '../../modules/delivery/permissions/Order'

import {
    ZONE_CREATE,
    ZONE_DELETE,
    ZONE_SHOW,
    ZONE_UPDATE
} from '../../modules/maps/permissions/Zone'

import {
    LOCATION_CREATE,
    LOCATION_DELETE,
    LOCATION_SHOW,
    LOCATION_UPDATE
} from '../../modules/maps/permissions/Location'


import {
    CALENDAR_CREATE,
    CALENDAR_DELETE,
    CALENDAR_SHOW,
    CALENDAR_UPDATE
} from '../../modules/calendar/permissions/Calendar'

import {
    METHOD_CREATE,
    METHOD_DELETE,
    METHOD_SHOW,
    METHOD_UPDATE
} from '../../modules/payment/permissions/Method'

export default [
    BASE_SHOW,

    settingsPermissions.SETTINGS_CREATE,
    settingsPermissions.SETTINGS_DELETE,
    settingsPermissions.SETTINGS_SHOW,
    settingsPermissions.SETTINGS_UPDATE,

    PRODUCT_CREATE,
    PRODUCT_DELETE,
    PRODUCT_SHOW,
    PRODUCT_UPDATE,

    PRODUCTCATEGORY_CREATE,
    PRODUCTCATEGORY_DELETE,
    PRODUCTCATEGORY_SHOW,
    PRODUCTCATEGORY_UPDATE,

    INGREDIENT_CREATE,
    INGREDIENT_DELETE,
    INGREDIENT_SHOW,
    INGREDIENT_UPDATE,

    ORDER_CREATE,
    ORDER_DELETE,
    ORDER_SHOW,
    ORDER_UPDATE,
    MY_DELIVERY_ORDERS,

    ORDER_SHOW_BAR,
    ORDER_SHOW_KITCHEN,

    ZONE_CREATE,
    ZONE_DELETE,
    ZONE_SHOW,
    ZONE_UPDATE,

    LOCATION_CREATE,
    LOCATION_DELETE,
    LOCATION_SHOW,
    LOCATION_UPDATE,

    CALENDAR_CREATE,
    CALENDAR_DELETE,
    CALENDAR_SHOW,
    CALENDAR_UPDATE,

    METHOD_CREATE,
    METHOD_DELETE,
    METHOD_SHOW,
    METHOD_UPDATE
]
