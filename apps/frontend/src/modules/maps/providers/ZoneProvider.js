import graphqlClient from "../../../apollo";

class ZoneProvider {

    findZone(id) {
        return graphqlClient.query({
            query: require('./gql/zoneFind.graphql'),
            variables: {id:id}
        })
    }

    fetchZonesPoint({latitude, longitude}) {
        return graphqlClient.query({
            query: require('./gql/zonesPoint.graphql'),
            variables: {latitude, longitude},
            fetchPolicy: "network-only"
        })
    }

    fetchZones() {
        return graphqlClient.query({
            query: require('./gql/zoneFetch.graphql'),
            fetchPolicy: "network-only"
        })
    }

    paginateZones(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/zonePaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }



    createZone(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/zoneCreate.graphql'),
            variables: form
        })
    }

    updateZone(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/zoneUpdate.graphql'),
            variables: form
        })
    }

     deleteZone(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/zoneDelete.graphql'),
            variables: {id}
        })
    }

}

export default new ZoneProvider()


