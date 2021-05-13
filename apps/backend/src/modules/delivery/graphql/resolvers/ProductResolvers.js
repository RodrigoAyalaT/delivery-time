
import { createProduct, updateProduct, deleteProduct,  findProduct, fetchProducts, paginateProducts} from '../../services/ProductService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    PRODUCT_SHOW,
    PRODUCT_UPDATE,
    PRODUCT_CREATE,
    PRODUCT_DELETE
} from "../../permissions/Product";

export default {
    Query: {
        productFind: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCT_SHOW)) throw new ForbiddenError("Not Authorized")
            return findProduct(id)
        },
        productFetch: (_, {}, {user,rbac}) => {
           // if (!user) throw new AuthenticationError("Unauthenticated")
          //  if(!rbac.isAllowed(user.id, PRODUCT_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchProducts()
        },
        productPaginate: (_, {pageNumber, itemsPerPage, search, orderBy, orderDesc}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCT_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateProducts(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },

    },
    Mutation: {
        productCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCT_CREATE)) throw new ForbiddenError("Not Authorized")
            return createProduct(user, input)
        },
        productUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCT_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateProduct(user, id, input)
        },
        productDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCT_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteProduct(id)
        },
    }

}

