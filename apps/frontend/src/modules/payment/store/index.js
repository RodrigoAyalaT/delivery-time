import MethodsProvider from "../providers/MethodsProvider";

export default {
    state: {
        paymentMethods: null,
    },
    getters: {
        getPaymentMethods: (state) => {
            return state.paymentMethods
        },

    },
    actions: {
        findPaymentMethods({commit}) {
            return new Promise((resolve, reject) => {
                MethodsProvider.findPaymentMethods()
                    .then(res => {
                        commit('setPaymentMethods', res.data.paymentMethodsFind)
                        resolve(res.data.paymentMethodsFind)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        updatePaymentMethods({state, commit}) {
            return new Promise((resolve, reject) => {
                if (!state.paymentMethods) {
                    return reject('payment methods was no set')
                }
                MethodsProvider.updatePaymentMethods(
                    {
                        title: state.paymentMethods.title,
                        cash: {
                            enable: state.paymentMethods.cash.enable,
                            info: state.paymentMethods.cash.info,
                        },
                        bankTransfer: {
                            enable: state.paymentMethods.bankTransfer.enable,
                            info: state.paymentMethods.bankTransfer.info,
                            cbu: state.paymentMethods.bankTransfer.cbu,
                            alias: state.paymentMethods.bankTransfer.alias,
                        },
                        mercadoPagoTransfer: {
                            enable: state.paymentMethods.mercadoPagoTransfer.enable,
                            info: state.paymentMethods.mercadoPagoTransfer.info,
                            cvu: state.paymentMethods.mercadoPagoTransfer.cvu,
                            alias: state.paymentMethods.mercadoPagoTransfer.alias,
                        }
                    }


                )
                    .then(r => {
                        commit('setPaymentMethods', r.data.paymentMethodsUpdate)
                        resolve(r.data.paymentMethodsUpdate)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        }
    },
    mutations: {
        setPaymentMethods(state, val) {
            state.paymentMethods = val
        },

    }
}
