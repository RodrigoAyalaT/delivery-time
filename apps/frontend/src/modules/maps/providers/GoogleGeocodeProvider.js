import graphqlClient from "../../../apollo";

class GoogleGeocodeProvider {

    googleGeocode(address) {
        return graphqlClient.query({
            query: require('./gql/googleGeocode.graphql'),
            variables: {address}
        })
    }



}

export default new GoogleGeocodeProvider()


