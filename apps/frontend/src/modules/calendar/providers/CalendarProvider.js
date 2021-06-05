import graphqlClient from "../../../apollo";

class CalendarProvider {

    findCalendar(id) {
        return graphqlClient.query({
            query: require('./gql/calendarFind.graphql'),
            variables: {id:id},
            fetchPolicy: "network-only"
        })
    }

    findCalendarByIdentifier(identifier) {
        return graphqlClient.query({
            query: require('./gql/calendarFindByIdentifier.graphql'),
            variables: {identifier},
            fetchPolicy: "network-only"
        })
    }

    fetchCalendars() {
        return graphqlClient.query({
            query: require('./gql/calendarFetch.graphql'),
            fetchPolicy: "network-only"
        })
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


