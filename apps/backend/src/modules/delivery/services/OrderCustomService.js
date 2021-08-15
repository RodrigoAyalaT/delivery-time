import Order from "../models/OrderModel";
import dayjs from "dayjs";

export const orderGroupByState = async function (date) {
    return new Promise((resolve, rejects) => {

        let now = date ? dayjs(date).startOf('day') : dayjs().startOf('day')
        console.log(now)
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

        let now = date ? dayjs(date).startOf('day') : dayjs().startOf('day')

        let query = {state: state}

        if(state === 'DELIVERED'){
            query.updatedAt = {$gte: now.toDate()}
        }

        Order.find( query ).populate('items.product').populate('user').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}
