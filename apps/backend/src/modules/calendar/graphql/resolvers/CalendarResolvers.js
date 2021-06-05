
import {
    createCalendar,
    updateCalendar,
    deleteCalendar,
    findCalendar,
    fetchCalendars,
    paginateCalendars,
    findCalendarByIdentifier
} from '../../services/CalendarService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    CALENDAR_SHOW,
    CALENDAR_UPDATE,
    CALENDAR_CREATE,
    CALENDAR_DELETE
} from "../../permissions/Calendar";

export default {
    Query: {
        calendarFind: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, CALENDAR_SHOW)) throw new ForbiddenError("Not Authorized")
            return findCalendar(id)
        },
        calendarFindByIdentifier: (_, {identifier}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, CALENDAR_SHOW)) throw new ForbiddenError("Not Authorized")
            return findCalendarByIdentifier(identifier)
        },
        calendarFetch: (_, {}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, CALENDAR_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchCalendars()
        },
        calendarPaginate: (_, {pageNumber, itemsPerPage, search, orderBy, orderDesc}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, CALENDAR_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateCalendars(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },

    },
    Mutation: {
        calendarCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, CALENDAR_CREATE)) throw new ForbiddenError("Not Authorized")
            return createCalendar(user, input)
        },
        calendarUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, CALENDAR_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateCalendar(user, id, input)
        },
        calendarDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, CALENDAR_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteCalendar(id)
        },
    }

}

