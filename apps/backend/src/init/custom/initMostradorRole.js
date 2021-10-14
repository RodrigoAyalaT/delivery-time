import {MY_DELIVERY_ORDERS, ORDER_SHOW_BAR} from "../../modules/delivery/permissions/Order";

module.exports = {
    name: "mostrador",
    permissions: [
        "SECURITY_GROUP_SHOW",
        MY_DELIVERY_ORDERS,
        ORDER_SHOW_BAR
    ]
}
