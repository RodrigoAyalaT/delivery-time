import graphqlClient from "../../../apollo";

class OrderProvider {

    findOrder(id) {
        return graphqlClient.query({
            query: require('./gql/orderFind.graphql'),
            variables: {id: id}
        })
    }

    findOrderByIdentifier(identifier) {
        return graphqlClient.query({
            query: require('./gql/orderFindByIdentifier.graphql'),
            variables: {identifier: identifier}
        })
    }

    fetchOrders() {
        return graphqlClient.query(
            {
                query: require('./gql/orderFetch.graphql'),
                fetchPolicy: "network-only"
            })
    }

    fetchOrdersByState(state) {
        return graphqlClient.query(
            {
                query: require('./gql/orderFetchByState.graphql'),
                variables: {state: state},
                fetchPolicy: "network-only"
            })
    }

    paginateOrders(pageNumber, itemsPerPage, search = null, orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/orderPaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }


    createOrder(orderInput) {
        return graphqlClient.mutate({
            mutation: require('./gql/orderCreate.graphql'),
            variables: {input: orderInput}
        })
    }

    updateOrder(orderInput) {
        return graphqlClient.mutate({
            mutation: require('./gql/orderUpdate.graphql'),
            variables: {input: orderInput}
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


