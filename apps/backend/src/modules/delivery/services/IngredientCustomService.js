import Ingredient from './../models/IngredientModel'

export const fetchIngredientFiltered = async function (filters) {
    return new Promise(async (resolve, reject) => {

        let find = {}
        if (filters. length > 0) {
            find= {$or: filters.map(f => ({ "name": {"$regex": f, "$options": "i"}}))}
        }

        Ingredient.find(find).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}
