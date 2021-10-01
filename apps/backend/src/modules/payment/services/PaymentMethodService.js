import PaymentMethods from '../models/PaymentMethodsModel'
import {UserInputError} from 'apollo-server-express'

export const findMethods = async function (id) {
    return new Promise((resolve, reject) => {
        PaymentMethods.findOne({}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const initMethods = function () {
    return new Promise(async (resolve, rejects) => {

        let methods = await findMethods()
        if (methods != null) {
            return resolve(methods)
        } else {
            const doc = new PaymentMethods({
                title: '¿Como queres pagar?',
                cash: {
                    enable: true,
                    info: '',
                    discount: 0
                },
                bankTransfer: {
                    enable: true,
                    cbu: '',
                    alias: '',
                    discount: 0,
                    info: ''
                },
                mercadoPagoTransfer: {
                    enable: true,
                    cvu: '',
                    alias: '',
                    discount: 0,
                    info: ''
                },
            })
            doc.id = doc._id;
            doc.save((error => {
                if (error) {
                    if (error.name == "ValidationError") {
                        return rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    return rejects(error)
                }
                return resolve(doc)
            }))

        }

    })
}

export const updateMethods = function (authUser, {title, cash, bankTransfer, mercadoPagoTransfer}) {
    return new Promise((resolve, rejects) => {
        PaymentMethods.findOneAndUpdate({},
            {
                title,
                $set: {
                    'cash.enable': cash.enable,
                    'cash.info': cash.info,

                    'bankTransfer.enable': bankTransfer.enable,
                    'bankTransfer.info': bankTransfer.info,
                    'bankTransfer.cbu': bankTransfer.cbu,
                    'bankTransfer.alias': bankTransfer.alias,

                    'mercadoPagoTransfer.enable': mercadoPagoTransfer.enable,
                    'mercadoPagoTransfer.info': mercadoPagoTransfer.info,
                    'mercadoPagoTransfer.cvu': mercadoPagoTransfer.cvu,
                    'mercadoPagoTransfer.alias': mercadoPagoTransfer.alias,
                }
            },
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        return rejects(new UserInputError(error.message, {inputErrors: error.errors}));

                    }
                    return rejects(error)

                }

                resolve(doc)
            })
    })
}


