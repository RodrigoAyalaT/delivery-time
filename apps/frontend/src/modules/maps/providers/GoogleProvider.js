import graphqlClient from "../../../apollo";

class GoogleProvider {

    googleGeocode(address) {
        return graphqlClient.query({
            query: require('./gql/googleGeocode.graphql'),
            variables: {address}
        })
    }

    googleStreetViewImage({latitude, longitude}) {
        return graphqlClient.query({
            query: require('./gql/googleStreetViewImage.graphql'),
            variables: {latitude, longitude}
        })
    }

}

export default new GoogleProvider()


