
import {AuthenticationError} from "apollo-server-express";

import {addressHandler} from "../../services/GoogleAddressService";

export default {
    Query: {
        googleGeocode: (_, {address}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return addressHandler(address)
        },

    },

}

