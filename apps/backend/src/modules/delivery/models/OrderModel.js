import pointSchema from "../../maps/models/PointSchema";

const mongoose = require('mongoose');


const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    contact: {
        name: {type: String, required: true, unique: false},
        phone: {type: String, required: true, unique: false},
        email: {type: String, required: false, unique: false},
        observations: {type: String, required: false, unique: false},
    },
    delivery: {
        mode: {type: String, required: true, unique: false}, //TAKE_AWAY|DELIVERY
        timeMode: {type: String, required: true, unique: false}, //AS_SON_AS_POSIBLE|SCHEDULED
        time: {type: String, required: true, unique: false},
        cost: {type: Number, unique: false, default: 0},
    },
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, unique: false},
            quantity: {type: Number, required: true, unique: false},
            amount: {type: Number, required: true, unique: false},
            price: {type: Number, required: true, unique: false},

        }
    ],
    location: {
        address: {type: String, required: true, unique: false},
        floor: {type: String, required: false, unique: false},
        apartment: {type: String, required: false, unique: false},
        latitude: {type: Number, required: false, unique: false},
        longitude: {type: Number, required: false, unique: false},
        country: {type: String, required: false, unique: false},
        province: {type: String, required: false, unique: false},
        locality: {type: String, required: false, unique: false},
        postalCode: {type: String, required: false, unique: false},
        point: {type: pointSchema, required: false}
    },
    zone: {type: mongoose.Schema.Types.ObjectId, ref: "Zone", required: false, unique: false},
    zoneName: {type: String, required: false, unique: false},
    state: {
        type: String, enum: [
            'PENDING_RECEIPT',
            'REVIEW',
            'NEW',
            'PREPARING',
            'READY',
            'ON_THE_WAY',
            'DELIVERED',
        ], required: true
    },
    payment: {
        method: {
            type: String,
            enum: [
                'CASH',
                'BANK_TRANSFER',
                'MP_TRANSFER',
            ], required: false
        },
        receiptFile: {type: String, required: false, unique: false},
        transactionId: {type: String, required: false, unique: false},
        confirmed: {type: Boolean, required: false, unique: false, default: false},
    },
    identifier: {type: String, required: false, unique: false},
    number: {type: Number, required: false, unique: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false, unique: false},
    totalQuantity: {type: Number, required: true, unique: false},
    totalAmount: {type: Number, required: true, unique: false},
    deliveryUser: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false, unique: false}

}, {timestamps: true});


OrderSchema.plugin(mongoosePaginate);
OrderSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
