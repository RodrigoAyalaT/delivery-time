import Order from './../models/OrderModel'
import {UserInputError} from 'apollo-server-express'
import {incrementSequenceNumber} from "./SequenceNumberService";
import {fetchProductsInId} from "./ProductService";
import {pointZone} from "../../maps/services/ZoneService";

export const findOrder = function (id) {
    return new Promise((resolve, reject) => {
        Order.findOne({_id: id}).populate('items.product').populate('items.product.category').populate('user').populate('deliveryUser').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findOrderByIdentifier = function (identifier) {
    return new Promise((resolve, reject) => {
        Order.findOne({identifier: identifier})
            .populate({
                path: 'items.product',
                populate: {
                    path: 'category',
                    model: 'ProductCategory',
                }
            })
            .populate('user').populate('deliveryUser').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findOrderByNumber = function (number) {
    return new Promise((resolve, reject) => {
        Order.findOne({number: number}).populate('items.product').populate('items.product.category').populate('user').populate('deliveryUser').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchOrders = function () {
    return new Promise((resolve, reject) => {
        Order.find({}).populate('items.product').populate('user').populate('deliveryUser').exec((err, res) => (
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
    let populate = ['items.product', 'user', 'deliveryUser']
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

async function calculateItems(items) {

    let totalAmount = 0
    let totalQuantity = 0

    let products = await fetchProductsInId(items.map(i => i.product))

    items.forEach(item => {
        let product = products.find(p => p.id === item.product)
        if (product) {
            item.price = product.price
            item.amount = product.price * item.quantity
            totalAmount += item.amount
            totalQuantity += item.quantity
        } else {
            throw new Error("Product not found")
        }

    })

    return {
        totalQuantity: totalQuantity,
        totalAmount: totalAmount
    }

}

export const createOrder = function (authUser, {contact, delivery, location, items, payment}) {

    return new Promise(async (resolve, rejects) => {

        try {

            let state = 'NEW'

            if(payment && /TRANSFER/.test(payment.method)){
                state = 'PENDING_RECEIPT'
            }

            let userId = authUser ? authUser.id : null
            let number = await incrementSequenceNumber('orders')
            let identifier = randomLetters(3) + number
            let {totalQuantity, totalAmount} = await calculateItems(items)
            let zone, zoneName

            if (location.latitude && location.longitude) {
                zone = await pointZone(location.latitude, location.longitude)
                zoneName = (zone && zone.name) ? zone.name : null
            }

            const doc = new Order({
                identifier, number,
                contact, delivery, location, items,
                state,
                user: userId,
                totalQuantity, totalAmount,
                zone, zoneName, payment
            })

            doc.id = doc._id;

            doc.save((error => {

                if (error) {
                    if (error.name == "ValidationError") {
                        return rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    return rejects(error)
                }

                return doc.populate('items.product').populate('user').populate('deliveryUser').execPopulate(() => resolve(doc))
            }))
        } catch (e) {
            return rejects(e)
        }


    })
}

export const updateOrder = async function (authUser, id, {contact, delivery, location, items, state, payment}) {
    return new Promise((resolve, rejects) => {
        Order.findOneAndUpdate({_id: id},
            {contact, delivery, location, items, state, payment},
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        return rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    return rejects(error)
                }

                return doc.populate('items.product').populate('user').populate('deliveryUser').execPopulate(() => resolve(doc))
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

