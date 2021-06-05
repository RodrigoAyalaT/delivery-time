import graphqlClient from "../../../apollo";

class CalendarProvider {

    findCalendar(id) {
        return graphqlClient.query({
            query: require('./gql/calendarFind.graphql'),
            variables: {id:id}
        })
    }

    findCalendarByIdentifier(identifier) {
        return graphqlClient.query({
            query: require('./gql/calendarFindByIdentifier.graphql'),
            variables: {identifier}
        })
    }

    fetchCalendars() {
        return graphqlClient.query({query: require('./gql/calendarFetch.graphql')})
    }

    paginateCalendars(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/calendarPaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }



    createCalendar(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/calendarCreate.graphql'),
            variables: form
        })
    }

    updateCalendar(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/calendarUpdate.graphql'),
            variables: form
        })
    }

     deleteCalendar(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/calendarDelete.graphql'),
            variables: {id}
        })
    }

}

export default new CalendarProvider()


