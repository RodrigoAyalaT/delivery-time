import OrderProvider from "@/modules/delivery/providers/OrderProvider";
import ProductCategoryProvider from "@/modules/delivery/providers/ProductCategoryProvider";

const TAKE_AWAY = 'TAKE_AWAY'
const DELIVERY = 'DELIVERY'


export default {
    state: {
        categories: [],
        orderStates: ['PENDING_RECEIPT', 'NEW', 'PREPARING', 'READY', 'ON_THE_WAY', 'DELIVERED'],
        orderError: null,
        orderLoading: false,
        orderHistory: [], //List of identifiers
        currentOrderIdentifier: null, //Current identifier order (new->delivered)
        lastLocation: {
            address: '',
            floor: '',
            apartment: '',
            latitude: null,
            longitude: null,
            country: '',
            province: '',
            locality: '',
            postalCode: ''
        },
        locationHistory: [],
        order: {
            delivery: {
                mode: null, //TAKE_AWAY|DELIVERY
                timeMode: null, //AS_SON_AS_POSIBLE|SCHEDULED
                time: null,
            },
            contact: {
                name: '',
                phone: '',
                email: '',
                observations: ''
            },
            location: {
                address: '',
                floor: '',
                apartment: '',
                latitude: null,
                longitude: null,
                country: '',
                province: '',
                locality: '',
                postalCode: ''
            },
            payment: {
                method: 'CASH',
                receiptFile: null,
                transactionId: null,
                confirmed: false
            },
            items: []
        },
    },
    getters: {
        getCategories(state) {
            return state.categories
        },
        isTakeAway(state) {
            return state.order.delivery.mode === TAKE_AWAY
        },
        isDelivery(state) {
            return state.order.delivery.mode === DELIVERY
        },
        getCurrentOrderIdentifier(state) {
            return state.currentOrderIdentifier
        },
        getOrderHistory(state) {
            return state.orderHistory
        },
        getOrderStates(state) {
            return state.orderStates
        },
        getOrderLoading(state) {
            return state.orderLoading
        },
        hasLocationHistory(state) {
            return (state.locationHistory.length > 0)
        },
        getLocationHistory(state) {
            return state.locationHistory
        },
        getOrderError(state) {
            return state.orderError
        },
        getOrderDelivery(state) {
            return state.order.delivery
        },
        getOrderContact(state) {
            return state.order.contact
        },
        getOrderLocation(state) {
            return state.order.location
        },
        getDeliveryMode(state) {
            return state.order.delivery.mode
        },
        getDeliveryTimeMode(state) {
            return state.order.delivery.timeMode
        },
        getDeliveryTime(state) {
            return state.order.delivery.time
        },
        getOrderPayment(state) {
            return state.order.payment
        },
        getQuantity: (state) => (product) => {
            if (product) {
                let item = state.order.items.find(p => p.product.id === product.id)
                if (item) {
                    return item.quantity
                }
            }
            return 0
        },
        getAmount: (state) => (product) => {
            if (product) {
                let item = state.order.items.find(p => p.product.id === product.id)
                if (item) {
                    return item.amount
                }
            }
            return 0
        },
        getQuantityTotal(state) {
            if (state.order.items && state.order.items.length) {
                return state.order.items.reduce((a, v) => a + v.quantity, 0)
            } else {
                return 0
            }

        },
        getAmountTotal(state) {
            if (state.order.items && state.order.items.length) {
                return state.order.items.reduce((a, v) => a + v.amount, 0)
            } else {
                return 0
            }

        },
        getOrderForm(state) {
            let order = {
                delivery: state.order.delivery,
                contact: state.order.contact,
                location: state.order.location,
                payment: state.order.payment,
                items: state.order.items.map(item => ({
                    product: item.product.id,
                    quantity: item.quantity,
                    // amount: item.amount
                }))
            }
            return order
        },
        orderIsReady(state, getters) {
            //NO ITEMS
            if (getters.getQuantityTotal == 0) {
                return false
            }
            //NO DELIVERY COMPLETE
            if (
                !getters.getOrderDelivery.mode ||
                !getters.getOrderDelivery.timeMode ||
                !getters.getOrderDelivery.time
            ) {
                return false
            }

            //NO CONTACT DATA
            if (
                !getters.getOrderContact.name ||
                !getters.getOrderContact.phone ||
                !getters.getOrderContact.email
            ) {
                return false
            }

            return true
        },
        orderConfirmationErrorMessage(state, getters) {
            let messages = []

            if (getters.getQuantityTotal == 0) {
                messages.push('delivery.empty.items')
            }

            if (!getters.getOrderDelivery.mode) {
                messages.push('delivery.empty.deliveryMode')
            }

            if (!getters.getOrderDelivery.timeMode || !getters.getOrderDelivery.time) {
                messages.push('delivery.empty.time')
            }


            if (getters.isDelivery && !getters.getOrderLocation.address) {
                messages.push('delivery.empty.location')
            }

            if (
                !getters.getOrderContact.name ||
                !getters.getOrderContact.phone ||
                !getters.getOrderContact.email
            ) {
                messages.push('delivery.empty.contact')
            }

            if (
                !getters.getOrderPayment.method
            ) {
                messages.push('delivery.empty.paymentMethod')
            }

            return messages
        }
    },
    actions: {
        fetchCategories({commit}) {
            ProductCategoryProvider.fetchProductCategories().then(r => {
                commit("setCategories", r.data.productCategoryFetch)
            })
        },
        createOrder({commit, getters}) {
            return new Promise((resolve, reject) => {
                commit("setOrderLoading", true)
                commit("setOrderError", null)
                OrderProvider.createOrder(getters.getOrderForm)
                    .then(r => {
                        console.log("orderCreated", r.data)
                        commit("setCurrentOrderIdentifier", r.data.orderCreate.identifier)
                        commit("addOrderToHistory", r.data.orderCreate.identifier)
                        commit("clearOrderItems")
                        resolve(r.data.orderCreate.identifier)
                    })
                    .catch(e => {
                        commit("setOrderError", e.message)
                        reject()
                    })
                    .finally(() => {
                        commit("setOrderLoading", false)
                    })
            })

        },
        resetOrder({commit}) {
            commit('setCurrentOrderIdentifier', null)
            commit('clearOrderItems')
            commit('clearOrderDelivery')
            commit('clearOrderLocation')
            commit('clearOrderPayment')
        },
        resetOrderContact({commit}) {
            commit('clearOrderContact')
        },
        clearOrderItems({commit}) {
            commit('clearOrderItems')
        }
    },
    mutations: {
        setCategories(state, val) {
            state.categories = val
        },
        setCurrentOrderIdentifier(state, val) {
            state.currentOrderIdentifier = val
        },
        addOrderToHistory(state, val) {
            state.orderHistory.push(val)
        },

        setOrderError(state, val) {
            state.orderError = val
        },
        setOrderLoading(state, val) {
            state.orderLoading = val
        },
        setOrderDeliveryMode(state, val) {
            state.order.delivery.time = null
            state.order.delivery.timeMode = null
            state.order.delivery.mode = val
        },
        setOrderPayment(state, val) {
            state.order.payment = val
        },
        setOrderPaymentMethod(state, val) {
            state.order.payment.method = val
        },
        setOrderPaymentReceiptFile(state, val) {
            state.order.payment.receiptFile = val
        },
        setOrderPaymentTransactionId(state, val) {
            state.order.payment.transactionId = val
        },
        setOrderPaymentConfirmed(state, val) {
            state.order.payment.confirmed = val
        },
        clearOrderPayment(state){
            state.order.payment.method = 'CASH'
            state.order.payment.receiptFile = null
            state.order.payment.transactionId = null
            state.order.payment.confirmed = false
        },
        clearOrderDelivery(state) {
            state.order.delivery.time = null
            state.order.delivery.timeMode = null
            state.order.delivery.mode = null
        },

        setOrderDeliveryTimeMode(state, val) {
            state.order.delivery.timeMode = val
        },
        setOrderDeliveryTime(state, val) {
            state.order.delivery.time = val
        },
        setOrderContact(state, val) {
            state.order.contact = val
        },
        setOrderLocation(state, location) {
            state.order.location = location
            state.lastLocation = location
        },
        clearOrderLocation(state) {
            state.order.location = {
                address: '',
                floor: '',
                apartment: '',
                latitude: null,
                longitude: null,
                country: '',
                province: '',
                locality: '',
                postalCode: ''
            }
        },

        setOrderLocationAddress(state, val) {
            state.order.location.address = val
        },

        recoveryLastLocation(state) {
            state.order.location = state.lastLocation
        },
        addLocationHistory(state, location) {
            if (location && location.address != '' && location.latitude != null && location.longitude != null) {
                if (state.locationHistory.some(l => l.address === location.address)) {
                    state.locationHistory.sort(function (x, y) {
                        return x.address == location.address ? -1 : y.address == location.address ? 1 : 0;
                    });
                } else {
                    state.locationHistory.push(Object.assign({}, location))

                }
            }
        },
        removeOrderToHistory(state, location) {
            let index = state.locationHistory.findIndex(l => l.address === location.address)
            if (index != -1) {
                state.locationHistory.splice(index, 1)
            }
        },
        clearOrderItems(state) {
            state.order.items = []
        },
        clearOrderContact(state) {
            state.order.contact = {
                name: '',
                phone: '',
                email: '',
                observations: ''
            }
        },
        setOrderItems(state, val) {
            state.order.items = val
        },
        changeOrderItemQuantity(state, {product, quantity}) {

            if (quantity === 0) {
                let index = state.order.items.findIndex(p => p.product.id === product.id)
                state.order.items.splice(index, 1)
                return
            }

            let item = state.order.items.find(p => p.product.id === product.id)
            if(item){
                item.quantity = quantity
                item.amount = item.quantity ? product.price * item.quantity : 0
            }else{
                state.order.items.push({
                    product: product,
                    quantity: quantity,
                    amount: quantity * product.price
                })
            }

        },
        addOrderItem(state, product) {
            let item = state.order.items.find(p => p.product.id === product.id)
            if (item) {
                item.quantity++
                item.amount += product.price
            } else {
                state.order.items.push({
                    product: product,
                    quantity: 1,
                    amount: product.price
                })
            }
        },
        removeOrderItem(state, product) {
            let item = state.order.items.find(p => p.product.id === product.id)
            if (item && item.quantity > 0) {
                item.quantity--
                item.amount -= product.price
            }

            if (item.quantity === 0) {
                let index = state.order.items.findIndex(p => p.product.id === product.id)
                state.order.items.splice(index, 1)
            }
        },

    }
}
