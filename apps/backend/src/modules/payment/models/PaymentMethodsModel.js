const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentMethodsSchema = new Schema({

    title: {type: String, required: false, unique: false},
    cash: {
        identifier: {type: String, required: true, unique: true, default: "CASH"},
        label: {type: String, required: true, unique: true, default: "Efectivo"},
        enable: {type: Boolean, required: true, default: true},
        discount: {type: Number, required: false, default: 0},
        info: {type: String, required: false, unique: false}
    },
    bankTransfer: {
        identifier: {type: String, required: true, unique: true, default: "BANK_TRANSFER"},
        label: {type: String, required: true, unique: true, default: "Transferencia Bancaria"},
        enable: {type: Boolean, required: true, default: true},
        cbu: {type: String, required: false},
        alias: {type: String, required: false},
        discount: {type: Number, required: false, default: 0},
        info: {type: String, required: false, unique: false}
    },
    mercadoPagoTransfer: {
        identifier: {type: String, required: true, unique: true, default: "MP_TRANSFER"},
        label: {type: String, required: true, unique: true, default: "Transferencia Mercado Pago"},
        enable: {type: Boolean, required: true, default: true},
        cvu: {type: String, required: false},
        alias: {type: String, required: false},
        discount: {type: Number, required: false, default: 0},
        info: {type: String, required: false, unique: false}
    }

});



const PaymentMethods = mongoose.model('PaymentMethods', PaymentMethodsSchema);

module.exports = PaymentMethods;
