
import { createProductCategory, updateProductCategory, deleteProductCategory,  findProductCategory, fetchProductCategories, paginateProductCategories} from '../../services/ProductCategoryService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    PRODUCTCATEGORY_SHOW,
    PRODUCTCATEGORY_UPDATE,
    PRODUCTCATEGORY_CREATE,
    PRODUCTCATEGORY_DELETE
} from "../../permissions/ProductCategory";

export default {
    Query: {
        productCategoryFind: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCTCATEGORY_SHOW)) throw new ForbiddenError("Not Authorized")
            return findProductCategory(id)
        },
        productCategoryFetch: (_, {}, {user,rbac}) => {
            return fetchProductCategories()
        },
        productCategoryPaginate: (_, {pageNumber, itemsPerPage, search, orderBy, orderDesc}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCTCATEGORY_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateProductCategories(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },

    },
    Mutation: {
        productCategoryCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCTCATEGORY_CREATE)) throw new ForbiddenError("Not Authorized")
            return createProductCategory(user, input)
        },
        productCategoryUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCTCATEGORY_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateProductCategory(user, id, input)
        },
        productCategoryDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PRODUCTCATEGORY_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteProductCategory(id)
        },
    }

}

