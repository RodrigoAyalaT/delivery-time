import Order from "../models/OrderModel";
import dayjs from "dayjs";
import {UserInputError} from "apollo-server-express";

export const orderGroupByState = async function (date) {
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


export const updateOrderState = async function (authUser, id, state) {
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

export const updateOrderDeliveryUser = async function (orderId, userID) {
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
