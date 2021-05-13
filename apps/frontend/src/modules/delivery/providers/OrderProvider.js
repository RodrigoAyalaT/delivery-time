import graphqlClient from "../../../apollo";

class OrderProvider {

    findOrder(id) {
        return graphqlClient.query({
            query: require('./gql/orderFind.graphql'),
            variables: {id:id}
        })
    }

    fetchOrders() {
        return graphqlClient.query({query: require('./gql/orderFetch.graphql')})
    }
    
    paginateOrders(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/orderPaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }
    
    

    createOrder(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/orderCreate.graphql'),
            variables: form
        })
    }
    
    updateOrder(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/orderUpdate.graphql'),
            variables: form
        })
    }
    
     deleteOrder(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/orderDelete.graphql'),
            variables: {id}
        })
    }

}

export default new OrderProvider()


