
import {
    orderGroupByState, fetchOrdersByState
} from '../../services/OrderCustomService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {
    ORDER_SHOW,
} from "../../permissions/Order";


export default {
    Query: {
        orderGroupByState: (_, {date}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ORDER_SHOW)) throw new ForbiddenError("Not Authorized")
            return orderGroupByState(date)
        },
        orderFetchByState: (_, {state, date}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ORDER_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchOrdersByState(state,date)
        },
    }
}

