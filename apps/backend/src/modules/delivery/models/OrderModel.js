import pointSchema from "../../maps/models/PointSchema";

const mongoose = require('mongoose');


const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    contact: {
        name: {type: String, required: false, unique: false},
        phone: {type: String, required: true, unique: false},
        email: {type: String, required: false, unique: false},
    },
    delivery: {
        mode: {type: String, required: true, unique: false}, //TAKE_AWAY|DELIVERY
        timeMode: {type: String, required: true, unique: false}, //AS_SON_AS_POSIBLE|SCHEDULED
        time: {type: String, required: true, unique: false},
    },
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, unique: false},
            quantity: {type: Number, required: true, unique: false},
            amount:  {type: Number, required: true, unique: false},
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
        point: {type: pointSchema}
    },
    state: {type: String, enum: [
            'NEW',
            'PREPARING',
            'READY',
            'ON_THE_WAY',
            'DELIVERED',
        ], required: true},
    number: {type: Number, required: false, unique: false}


}, {timestamps: true});


OrderSchema.plugin(mongoosePaginate);
OrderSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
