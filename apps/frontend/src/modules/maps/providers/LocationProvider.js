import graphqlClient from "../../../apollo";

class LocationProvider {

    findLocation(id) {
        return graphqlClient.query({
            query: require('./gql/locationFind.graphql'),
            variables: {id:id}
        })
    }

    fetchLocations() {
        return graphqlClient.query({query: require('./gql/locationFetch.graphql')})
    }
    
    paginateLocations(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/locationPaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }
    
    

    createLocation(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/locationCreate.graphql'),
            variables: form
        })
    }
    
    updateLocation(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/locationUpdate.graphql'),
            variables: form
        })
    }
    
     deleteLocation(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/locationDelete.graphql'),
            variables: {id}
        })
    }

}

export default new LocationProvider()


