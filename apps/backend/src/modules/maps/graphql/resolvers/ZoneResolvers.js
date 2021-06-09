
import { createZone, updateZone, deleteZone,  findZone, fetchZones, paginateZones, pointZones} from '../../services/ZoneService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    ZONE_SHOW,
    ZONE_UPDATE,
    ZONE_CREATE,
    ZONE_DELETE
} from "../../permissions/Zone";

export default {
    Query: {
        zonesPoint: (_, {latitude, longitude}, {user,rbac}) => {
           // if (!user) throw new AuthenticationError("Unauthenticated")
          //  if(!rbac.isAllowed(user.id, ZONE_SHOW)) throw new ForbiddenError("Not Authorized")
            return pointZones(latitude, longitude)
        },
        zoneFind: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ZONE_SHOW)) throw new ForbiddenError("Not Authorized")
            return findZone(id)
        },
        zoneFetch: (_, {}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ZONE_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchZones()
        },
        zonePaginate: (_, {pageNumber, itemsPerPage, search, orderBy, orderDesc}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ZONE_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateZones(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },

    },
    Mutation: {
        zoneCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ZONE_CREATE)) throw new ForbiddenError("Not Authorized")
            return createZone(user, input)
        },
        zoneUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ZONE_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateZone(user, id, input)
        },
        zoneDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, ZONE_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteZone(id)
        },
    }

}

