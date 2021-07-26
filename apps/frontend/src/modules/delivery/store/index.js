import OrderProvider from "@/modules/delivery/providers/OrderProvider";
import ProductCategoryProvider from "@/modules/delivery/providers/ProductCategoryProvider";

const TAKE_AWAY = 'TAKE_AWAY'
const DELIVERY = 'DELIVERY'

export default {
    state: {
        categories: [],
        orderStates: ['NEW', 'PREPARING', 'READY', 'ON_THE_WAY', 'DELIVERED'],
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
        order: {
            delivery: {
                mode: null, //TAKE_AWAY|DELIVERY
                timeMode: null, //AS_SON_AS_POSIBLE|SCHEDULED
                time: null,
            },
            contact: {
                name: null,
                phone: null,
                email: null,
                observations: null
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
            items: []
        },
    },
    getters: {
        getCategories(state) {
            return state.categories
        },
        isTakeAway(state) {
            return state.order.delivery.mode == TAKE_AWAY
        },
        isDelivery(state) {
            return state.order.delivery.mode == DELIVERY
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

            return true
        },
        orderConfirmationErrorMessage(state,getters){
           let messages = []

            if (getters.getQuantityTotal == 0) {
                messages.push('delivery.empty.items')
            }

            if(!getters.getOrderDelivery.mode){
                messages.push('delivery.empty.deliveryMode')
            }

            if(!getters.getOrderDelivery.timeMode || !getters.getOrderDelivery.time){
                messages.push('delivery.empty.time')
            }


            if(getters.isDelivery && !getters.getOrderLocation.address){
                messages.push('delivery.empty.location')
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
            commit("setOrderLoading", true)
            commit("setOrderError", null)
            OrderProvider.createOrder(getters.getOrderForm)
                .then(r => {
                    console.log("orderCreated", r.data)
                    commit("setCurrentOrderIdentifier", r.data.orderCreate.identifier)
                    commit("addOrderToHistory", r.data.orderCreate.identifier)
                })
                .catch(e => {
                    commit("setOrderError", e.message)
                })
                .finally(() => {
                    commit("setOrderLoading", false)
                })
        },
        resetOrder({commit}){
            commit('setCurrentOrderIdentifier',null)
            commit('clearOrderItems')
            commit('clearOrderDelivery')
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
        setOrderLocation(state, val) {
            state.order.location = val
            state.lastLocation = val
        },
        setOrderLocationAddress(state,val){
          state.order.location.address = val
        },
        clearLocation(state) {
            state.lastLocation = state.order.location
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
        recoveryLastLocation(state){
            state.order.location = state.lastLocation
        },
        clearOrderItems(state) {
            state.order.items = []
        },
        setOrderItems(state, val) {
            state.order.items = val
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
