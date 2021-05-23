import ProductCategory from './../models/ProductCategoryModel'
import {UserInputError} from 'apollo-server-express'

export const findProductCategory = async function (id) {
    return new Promise((resolve, reject) => {
        ProductCategory.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchProductCategories = async function () {
    return new Promise((resolve, reject) => {
        ProductCategory.find({}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateProductCategories = function ( pageNumber = 1, itemsPerPage = 5, search = null, orderBy = null, orderDesc = false) {

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
    let populate = null
    let sort = getSort(orderBy, orderDesc)
    let params = {page: pageNumber, limit: itemsPerPage, populate, sort}

    return new Promise((resolve, reject) => {
        ProductCategory.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}





export const createProductCategory = async function (authUser, {name}) {
    
    const doc = new ProductCategory({
        name
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
        
            resolve(doc)
        }))
    })
}

export const updateProductCategory = async function (authUser, id, {name}) {
    return new Promise((resolve, rejects) => {
        ProductCategory.findOneAndUpdate({_id: id},
        {name}, 
        {new: true, runValidators: true, context: 'query'},
        (error,doc) => {
            
            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                rejects(error)
            } 
        
            resolve(doc)
        })
    })
}

export const deleteProductCategory = function (id) {
    return new Promise((resolve, rejects) => {
        findProductCategory(id).then((doc) => {
            doc.delete(function (err) {
                err ? rejects(err) : resolve({id: id, success: true})
            });
        })
    })
}

