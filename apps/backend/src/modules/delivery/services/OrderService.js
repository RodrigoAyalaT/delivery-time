import Order from './../models/OrderModel'
import {UserInputError} from 'apollo-server-express'

export const findOrder = async function (id) {
    return new Promise((resolve, reject) => {
        Order.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchOrders = async function () {
    return new Promise((resolve, reject) => {
        Order.find({}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateOrders = function (pageNumber = 1, itemsPerPage = 5, search = null, orderBy = null, orderDesc = false) {

    function qs(search) {
        let qs = {}
        if (search) {
            qs = {
                $or: [
                    {name: {$regex: search, $options: 'i'}},
                    {phone: {$regex: search, $options: 'i'}},
                    {email: {$regex: search, $options: 'i'}},
                    {address: {$regex: search, $options: 'i'}},
                    {number: {$regex: search, $options: 'i'}}
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
        Order.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}


export const createOrder = async function (authUser, {contact, delivery, location, items}) {
    let state = 'NEW'
    const doc = new Order({
        contact, delivery, location, items, state
    })
    doc.id = doc._id;
    return new Promise((resolve, rejects) => {
        doc.save((error => {

            if (error) {
                if (error.name == "ValidationError") {
                    return rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                return rejects(error)
            }

            return doc.populate('items.product').execPopulate(() => resolve(doc))
        }))
    })
}

export const updateOrder = async function (authUser, id, {contact, delivery, location, items, state}) {
    return new Promise((resolve, rejects) => {
        Order.findOneAndUpdate({_id: id},
            {contact, delivery, location, items, state},
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        return rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    return rejects(error)
                }

                return resolve(doc)
            })
    })
}

export const deleteOrder = function (id) {
    return new Promise((resolve, rejects) => {
        findOrder(id).then((doc) => {
            doc.delete(function (err) {
                err ? rejects(err) : resolve({id: id, success: true})
            });
        })
    })
}

