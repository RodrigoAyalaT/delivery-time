import Product from './../models/ProductModel'
import Ingredient from './../models/IngredientModel'
import {fetchIngredientFiltered} from './IngredientCustomService'


export const fetchProductFiltered = async function (filters) {
    return new Promise(async (resolve, reject) => {

        let find = {}
        if (filters.length > 0) {

            let ingredients = await fetchIngredientFiltered(filters)


            find= {$or: [
                    ...filters.map(f => ({ "name": {"$regex": f, "$options": "i"}})),
                    ...[{ingredients:{ "$in": ingredients.map(i => i.id) } }]
                ]}
        }


        console.log("FIND",find)


        Product.find(find).populate('ingredients').populate('category').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchProductFilteredOld = async function (filters) {
    return new Promise((resolve, reject) => {

        let find = {}
        if (filters.name) {
            find.name = {"$regex": filters.name, "$options": "i"}
        }

        if (filters.ingredients && filters.ingredients.length) {
            find.ingredients = {"$in": filters.ingredients}
        }

        if (filters.category) {
            find.category = filters.category
        }


        Product.find(find).populate('ingredients').populate('category').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}
