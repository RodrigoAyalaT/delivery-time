import graphqlClient from "../../../apollo";

class ProductCategoryProvider {

    findProductCategory(id) {
        return graphqlClient.query({
            query: require('./gql/productCategoryFind.graphql'),
            variables: {id:id}
        })
    }

    fetchProductCategories() {
        return graphqlClient.query({query: require('./gql/productCategoryFetch.graphql')})
    }
    
    paginateProductCategories(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/productCategoryPaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }
    
    

    createProductCategory(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/productCategoryCreate.graphql'),
            variables: form
        })
    }
    
    updateProductCategory(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/productCategoryUpdate.graphql'),
            variables: form
        })
    }
    
     deleteProductCategory(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/productCategoryDelete.graphql'),
            variables: {id}
        })
    }

}

export default new ProductCategoryProvider()


