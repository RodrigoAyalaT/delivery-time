import OrderProvider from "@/modules/delivery/providers/OrderProvider";

export default {
    state: {
        orderError: null,
        orderLoading: false,
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
        getOrderForm(state){
            let order = {
                delivery: state.order.delivery,
                contact: state.order.contact,
                location: state.order.location,
                items: state.order.items.map(item => ({
                    product: item.product.id,
                    quantity: item.quantity,
                    amount: item.amount
                }))
            }
            return order
        }
    },
    actions: {
        createOrder({commit, getters}) {
            commit("setOrderLoading", true)
            commit("setOrderError", null)
            OrderProvider.createOrder(getters.getOrderForm)
                .then(r => {
                    console.log("orderCreated", r.data)
                })
                .catch(e => {
                    commit("setOrderError", e.message)
                })
                .finally(() => {
                    commit("setOrderLoading", false)
                })
        }
    },
    mutations: {
        setOrderError(state, val) {
            state.orderError = val
        },
        setOrderLoading(state, val) {
            state.orderLoading = val
        },
        clearOrder(state) {
            state.order.items = []
        },
        setOrderDeliveryMode(state, val) {
            state.order.delivery.time = null
            state.order.delivery.timeMode = null
            state.order.delivery.mode = val
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
