import Order from './../models/OrderModel'
import {UserInputError} from 'apollo-server-express'
import {incrementSequenceNumber} from "./SequenceNumberService";

export const findOrder = function (id) {
    return new Promise((resolve, reject) => {
        Order.findOne({_id: id}).populate('items.product').populate('user').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findOrderByIdentifier = function (identifier) {
    return new Promise((resolve, reject) => {
        Order.findOne({identifier:identifier}).populate('items.product').populate('user').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchOrders = function () {
    return new Promise((resolve, reject) => {
        Order.find({}).populate('items.product').populate('user').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchOrdersByState = function (state) {
    return new Promise((resolve, reject) => {
        Order.find({state:state}).populate('items.product').populate('user').exec((err, res) => (
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
    let populate = ['items.product','user']
    let sort = getSort(orderBy, orderDesc)
    let params = {page: pageNumber, limit: itemsPerPage, populate, sort}

    return new Promise((resolve, reject) => {
        Order.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}

const randomLetters = function (length = 2) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

export const createOrder = async function (authUser, {contact, delivery, location, items}) {
    let state = 'NEW'
    let userId = authUser ? authUser.id : null
    let sequence = await incrementSequenceNumber('orders')
    let identifier = randomLetters(2) + sequence
    const doc = new Order({
        contact, delivery, location, items, state, user: userId, identifier
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

            return doc.populate('items.product').populate('user').execPopulate(() => resolve(doc))
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

