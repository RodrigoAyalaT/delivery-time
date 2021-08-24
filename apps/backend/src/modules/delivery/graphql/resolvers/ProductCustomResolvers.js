import {fetchProductFiltered} from "../../services/ProductCustomService";

export default {
    Query: {
        productFetchFiltered: (_, {filters}, {user,rbac}) => {

            return fetchProductFiltered(filters)

            /*return new Promise(resolve => {
                setTimeout(() => {
                    fetchProductFiltered(filters).then(r => resolve(r))
                },10)

            })*/


        },


    },
    Mutation: {

    }

}

