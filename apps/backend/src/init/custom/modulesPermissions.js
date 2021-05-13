/* ADD YOUR MODULE PERMISSIONS HERE */

import {
 BASE_SHOW
} from '../../modules/base/permissions'

import {
    PRODUCT_CREATE,
    PRODUCT_DELETE,
    PRODUCT_SHOW,
    PRODUCT_UPDATE
} from '../../modules/delivery/permissions/Product'

import {
    ORDER_CREATE,
    ORDER_DELETE,
    ORDER_SHOW,
    ORDER_UPDATE
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

export default [
    BASE_SHOW,
    PRODUCT_CREATE,
    PRODUCT_DELETE,
    PRODUCT_SHOW,
    PRODUCT_UPDATE,
    ORDER_CREATE,
    ORDER_DELETE,
    ORDER_SHOW,
    ORDER_UPDATE,

    ZONE_CREATE,
    ZONE_DELETE,
    ZONE_SHOW,
    ZONE_UPDATE,

    LOCATION_CREATE,
    LOCATION_DELETE,
    LOCATION_SHOW,
    LOCATION_UPDATE
]
