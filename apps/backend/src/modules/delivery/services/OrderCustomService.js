import Order from "../models/OrderModel";
import dayjs from "dayjs";
import {UserInputError} from "apollo-server-express";
import {CASH, PAYMENT_METHODS} from "../../payment/constants";

export const orderGroupByState =  function (date) {
    return new Promise((resolve, rejects) => {

        let now = date ? dayjs(date).startOf('day') : dayjs().startOf('day')
        Order.aggregate([
                {
                    $match: {
                        $or: [
                            {state: {$ne: 'DELIVERED'}},
                            {updatedAt: {$gte: now.toDate()} }
                        ]

                    }
                },
                {
                    $group: {
                        _id: "$state",
                        state: {$last: "$state"},
                        count: {$sum: 1}
                    }
                }
            ],
            (error, rows) => {
                console.log("rows", rows)
                if (error) return rejects(error)
                if(rows.length) return resolve(rows)
                return resolve([])
            })
    })
}

export const orderCashReport =  function (date) {
    return new Promise((resolve, rejects) => {

        let from = date ? dayjs(date).startOf('day') : dayjs().startOf('day')
        let to = from.add(1,'day')
        console.log(from, to)
        Order.aggregate([
                {
                    $match: {
                        $and: [
                            {state: {$eq: 'DELIVERED'}},
                            {updatedAt: {$gte: from.toDate(), $lt: to.toDate()} }
                        ]

                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "deliveryUser",
                        foreignField: "_id",
                        as: "du"
                    }
                },
                { $unwind: {path :'$du', preserveNullAndEmptyArrays: true} },
                {
                    $group: {
                        _id: {
                            deliveryUser: "$deliveryUser",
                            deliveryMode: "$delivery.mode",
                            paymentMethod: "$payment.method"
                        },
                        deliveryUser: {$last: "$deliveryUser"},
                        deliveryUsername: {$last: "$du.username"},
                        deliveryMode: {$last: "$delivery.mode"},
                        paymentMethod: {$last: "$payment.method"},
                        count: {$sum: 1},
                        amount: {$sum:"$totalAmount"}
                    }
                },

            ],
            (error, rows) => {
                console.log("rows", rows)
                if (error) return rejects(error)
                if(rows.length) return resolve(rows)
                return resolve([])
            })
    })
}

export const fetchOrdersByState = function (state, date) {
    return new Promise((resolve, reject) => {

        let now = date ? dayjs(date).startOf('day') : dayjs().subtract(16, 'hour')

        let query = {state: state}

        if(state === 'DELIVERED'){
            query.updatedAt = {$gte: now.toDate()}
        }

        Order.find( query ).populate({
            path: 'items.product',
            populate: {
                path: 'category',
                model: 'ProductCategory',
            }
        }).populate('user').populate('deliveryUser').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}


export const updateOrderState =  function (authUser, id, state) {
    return new Promise((resolve, rejects) => {
        Order.findOneAndUpdate({_id: id},
            {state},
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

export const updateOrderDeliveryUser =  function (orderId, userID) {
    return new Promise((resolve, rejects) => {
        Order.findOneAndUpdate({_id: orderId},
            {deliveryUser: userID},
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


export const updateOrderReceiptFile =  function (orderId, receiptFile) {
    return new Promise((resolve, rejects) => {
        Order.findOneAndUpdate({_id: orderId},
            {$set: {'payment.receiptFile': receiptFile, state: 'NEW'}},
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


export const updateOrderPaymentMethod =  function (orderId, paymentMethod) {
    return new Promise((resolve, rejects) => {


        if(!PAYMENT_METHODS.includes(paymentMethod)){
            return rejects(new Error("Incorrect PaymentMethod"))
        }

        let state = null

        if(paymentMethod === CASH){
            state = 'NEW'
        }

        Order.findOneAndUpdate({_id: orderId},
            {$set: {'payment.method': paymentMethod, ...(state && {state}) }},
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
