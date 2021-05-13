import graphqlClient from "../../../apollo";

class ProductProvider {

    findProduct(id) {
        return graphqlClient.query({
            query: require('./gql/productFind.graphql'),
            variables: {id:id}
        })
    }

    fetchProducts() {
        return graphqlClient.query({query: require('./gql/productFetch.graphql')})
    }
    
    paginateProducts(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/productPaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }
    
    

    createProduct(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/productCreate.graphql'),
            variables: form
        })
    }
    
    updateProduct(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/productUpdate.graphql'),
            variables: form
        })
    }
    
     deleteProduct(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/productDelete.graphql'),
            variables: {id}
        })
    }

}

export default new ProductProvider()


