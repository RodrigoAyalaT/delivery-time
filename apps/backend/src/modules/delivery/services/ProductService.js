import Product from './../models/ProductModel'
import {UserInputError} from 'apollo-server-express'

export const findProduct = async function (id) {
    return new Promise((resolve, reject) => {
        Product.findOne({_id: id}).populate('ingredients').populate('category').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchProducts = async function () {
    return new Promise((resolve, reject) => {
        Product.find({}).populate('ingredients').populate('category').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateProducts = function ( pageNumber = 1, itemsPerPage = 5, search = null, orderBy = null, orderDesc = false) {

    function qs(search) {
        let qs = {}
        if (search) {
            qs = {
                $or: [
                    {name: {$regex: search, $options: 'i'}}
                ]
            }
        }
        return qs
    }
    
     function getSort(orderBy, orderDesc) {
        if (orderBy) {
            return (orderDesc ? '-' : '') + orderBy
        } else {
            return null
        }
    }

    let query = qs(search)
    let populate = ['ingredients','category']
    let sort = getSort(orderBy, orderDesc)
    let params = {page: pageNumber, limit: itemsPerPage, populate, sort}

    return new Promise((resolve, reject) => {
        Product.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}





export const createProduct = async function (authUser, {name, description, image, price, stock, active, ingredients, category}) {
    
    const doc = new Product({
        name, description, image, price, stock, active, ingredients, category
    })
    doc.id = doc._id;
    return new Promise((resolve, rejects) => {
        doc.save((error => {
        
            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                rejects(error)
            }    
        
            doc.populate('ingredients').populate('category').execPopulate(() => resolve(doc))
        }))
    })
}

export const updateProduct = async function (authUser, id, {name, description, image, price, stock, active, ingredients, category}) {
    return new Promise((resolve, rejects) => {
        Product.findOneAndUpdate({_id: id},
        {name, description, image, price, stock, active, ingredients, category}, 
        {new: true, runValidators: true, context: 'query'},
        (error,doc) => {
            
            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                rejects(error)
            } 
        
            doc.populate('ingredients').populate('category').execPopulate(() => resolve(doc))
        })
    })
}

export const deleteProduct = function (id) {
    return new Promise((resolve, rejects) => {
        findProduct(id).then((doc) => {
            doc.delete(function (err) {
                err ? rejects(err) : resolve({id: id, success: true})
            });
        })
    })
}

