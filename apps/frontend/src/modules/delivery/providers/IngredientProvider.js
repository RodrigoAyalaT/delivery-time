import graphqlClient from "../../../apollo";

class IngredientProvider {

    findIngredient(id) {
        return graphqlClient.query({
            query: require('./gql/ingredientFind.graphql'),
            variables: {id:id}
        })
    }

    fetchIngredients() {
        return graphqlClient.query({query: require('./gql/ingredientFetch.graphql')})
    }
    
    paginateIngredients(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/ingredientPaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }
    
    

    createIngredient(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/ingredientCreate.graphql'),
            variables: form
        })
    }
    
    updateIngredient(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/ingredientUpdate.graphql'),
            variables: form
        })
    }
    
     deleteIngredient(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/ingredientDelete.graphql'),
            variables: {id}
        })
    }

}

export default new IngredientProvider()


