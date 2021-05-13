import {fetchProductFiltered} from "../../services/ProductCustomService";

export default {
    Query: {
        productFetchFiltered: (_, {filters}, {user,rbac}) => {
            return fetchProductFiltered(filters)
        },


    },
    Mutation: {

    }

}

