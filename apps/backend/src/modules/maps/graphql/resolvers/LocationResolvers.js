
import { createLocation, updateLocation, deleteLocation,  findLocation, fetchLocations, paginateLocations} from '../../services/LocationService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    LOCATION_SHOW,
    LOCATION_UPDATE,
    LOCATION_CREATE,
    LOCATION_DELETE
} from "../../permissions/Location";

export default {
    Query: {
        locationFind: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, LOCATION_SHOW)) throw new ForbiddenError("Not Authorized")
            return findLocation(id)
        },
        locationFetch: (_, {}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, LOCATION_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchLocations()
        },
        locationPaginate: (_, {pageNumber, itemsPerPage, search, orderBy, orderDesc}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, LOCATION_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateLocations(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },
        
    },
    Mutation: {
        locationCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, LOCATION_CREATE)) throw new ForbiddenError("Not Authorized")
            return createLocation(user, input)
        },
        locationUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, LOCATION_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateLocation(user, id, input)
        },
        locationDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, LOCATION_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteLocation(id)
        },
    }

}

