import {
    orderGroupByState,
    fetchOrdersByState,
    updateOrderDeliveryUser,
    updateOrderState,
    orderCashReport,
    updateOrderReceiptFile,
    updateOrderPaymentMethod
} from '../../services/OrderCustomService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {
    ORDER_SHOW, ORDER_UPDATE,
} from "../../permissions/Order";



export default {
    Query: {
        orderGroupByState: (_, {date}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, ORDER_SHOW)) throw new ForbiddenError("Not Authorized")
            return orderGroupByState(date)
        },
        orderCashReport: (_, {date}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, ORDER_SHOW)) throw new ForbiddenError("Not Authorized")
            return orderCashReport(date)
        },
        orderFetchByState: (_, {state, date}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, ORDER_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchOrdersByState(state, date)
        },
    },
    Mutation: {
        orderUpdateDeliveryUser: (_, {orderId, userId}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, ORDER_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateOrderDeliveryUser(orderId, userId)
        },
        orderUpdateReceiptFile: (_, {orderId, receiptFile}, {user, rbac}) => {
         //   if (!user) throw new AuthenticationError("Unauthenticated")
         //   if (!rbac.isAllowed(user.id, ORDER_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateOrderReceiptFile(orderId, receiptFile)
        },
        orderUpdatePaymentMethod: (_, {orderId, paymentMethod}, {user, rbac}) => {
            //   if (!user) throw new AuthenticationError("Unauthenticated")
            //   if (!rbac.isAllowed(user.id, ORDER_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateOrderPaymentMethod(orderId, paymentMethod)
        },
        orderUpdateState: (_, {id, state}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ORDER_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateOrderState(user, id, state)
        },
    }
}

