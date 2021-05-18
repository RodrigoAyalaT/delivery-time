export default {
    state: {
        order: {
            contact: {
                name: null,
                phone: null,
                email: null
            },
            location: {
                address: '',
                floor: null,
                apartment: null
            },
            items: []
        },
    },
    getters: {
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

        }
    },
    actions: {},
    mutations: {
        clearOrder(state) {
            state.order = {
                contact: {
                    name: null,
                    phone: null,
                    email: null
                },
                location: {
                    address: null,
                    floor: null,
                    apartment: null
                },
                items: []
            }
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
