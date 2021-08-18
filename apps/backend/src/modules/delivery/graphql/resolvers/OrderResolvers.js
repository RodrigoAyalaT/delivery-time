
import {
    createOrder,
    updateOrder,
    deleteOrder,
    findOrder,
    fetchOrders,
    paginateOrders,
    findOrderByIdentifier
} from '../../services/OrderService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    ORDER_SHOW,
    ORDER_UPDATE,
    ORDER_CREATE,
    ORDER_DELETE
} from "../../permissions/Order";

export default {
    Query: {
        orderFind: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ORDER_SHOW)) throw new ForbiddenError("Not Authorized")
            return findOrder(id)
        },
        orderFindByIdentifier: (_, {identifier}, {user,rbac}) => {
            //if (!user) throw new AuthenticationError("Unauthenticated")
           // if(!rbac.isAllowed(user.id, ORDER_SHOW)) throw new ForbiddenError("Not Authorized")
            return findOrderByIdentifier(identifier)
        },
        orderFetch: (_, {}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ORDER_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchOrders()
        },

        orderPaginate: (_, {pageNumber, itemsPerPage, search, orderBy, orderDesc}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ORDER_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateOrders(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },

    },
    Mutation: {
        orderCreate: (_, {input}, {user,rbac}) => {
        //    if (!user) throw new AuthenticationError("Unauthenticated")
        //    if(!rbac.isAllowed(user.id, ORDER_CREATE)) throw new ForbiddenError("Not Authorized")
            return createOrder(user, input)
        },

        orderUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ORDER_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateOrder(user, id, input)
        },
        orderDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ORDER_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteOrder(id)
        },
    }

}

