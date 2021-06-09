
import {AuthenticationError} from "apollo-server-express";

import {addressHandler, streetViewImageHandler} from "../../services/GoogleAddressService";

export default {
    Query: {
        googleGeocode: (_, {address}, {user,rbac}) => {
           // if (!user) throw new AuthenticationError("Unauthenticated")
            return addressHandler(address)
        },
        googleStreetViewImage: (_, {latitude, longitude}, {user, rbac}) => {
           // if (!user) throw new AuthenticationError("Unauthenticated")
            // if (!rbac.isAllowed(user.id, COMPANY_CREATE)) throw new ForbiddenError("Not Authorized")
            return streetViewImageHandler(latitude, longitude)
        },
    },

}

