import Product from './../models/ProductModel'

export const fetchProductFiltered = async function (filters) {
    return new Promise((resolve, reject) => {

        let find = {}
        if(filters.name){
            find.name = { "$regex": filters.name, "$options": "i" }
        }

        if(filters.ingredients && filters.ingredients.length){
            find.ingredients = { "$in": filters.ingredients }
        }

        if(filters.category){
            find.category = filters.category
        }


        Product.find(find).populate('ingredients').populate('category').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}
