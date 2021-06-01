
import { createIngredient, updateIngredient, deleteIngredient,  findIngredient, fetchIngredients, paginateIngredients} from '../../services/IngredientService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    INGREDIENT_SHOW,
    INGREDIENT_UPDATE,
    INGREDIENT_CREATE,
    INGREDIENT_DELETE
} from "../../permissions/Ingredient";

export default {
    Query: {
        ingredientFind: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, INGREDIENT_SHOW)) throw new ForbiddenError("Not Authorized")
            return findIngredient(id)
        },
        ingredientFetch: (_, {}, {user,rbac}) => {
       //     if (!user) throw new AuthenticationError("Unauthenticated")
       //     if(!rbac.isAllowed(user.id, INGREDIENT_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchIngredients()
        },
        ingredientPaginate: (_, {pageNumber, itemsPerPage, search, orderBy, orderDesc}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, INGREDIENT_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateIngredients(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },

    },
    Mutation: {
        ingredientCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, INGREDIENT_CREATE)) throw new ForbiddenError("Not Authorized")
            return createIngredient(user, input)
        },
        ingredientUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, INGREDIENT_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateIngredient(user, id, input)
        },
        ingredientDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, INGREDIENT_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteIngredient(id)
        },
    }

}

