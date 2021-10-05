import {updateMethods, findMethods} from '../../services/PaymentMethodService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    METHOD_SHOW,
    METHOD_UPDATE,
    METHOD_CREATE,
    METHOD_DELETE
} from "../../permissions/Method";

export default {
    Query: {
        paymentMethodsFind: (_, {id}, {user, rbac}) => {
           // if (!user) throw new AuthenticationError("Unauthenticated")
           // if (!rbac.isAllowed(user.id, METHOD_SHOW)) throw new ForbiddenError("Not Authorized")
            return findMethods()
        },

    },
    Mutation: {
        paymentMethodsUpdate: (_, {input}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, METHOD_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateMethods(user, input)
        },

    }
}

