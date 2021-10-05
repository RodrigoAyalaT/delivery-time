import graphqlClient from "../../../apollo";

class MethodsProvider {

    findPaymentMethods() {
        return graphqlClient.query({
            query: require('./gql/paymentMethodsFind.graphql'),
        })
    }


    updatePaymentMethods(input) {
        return graphqlClient.mutate({
            mutation: require('./gql/paymentMethodsUpdate.graphql'),
            variables: {input}
        })
    }

}

export default new MethodsProvider()


