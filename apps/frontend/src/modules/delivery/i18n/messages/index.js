import coreMessages from './core-messages'
import emptyMessages from './empty-messages'
import stateMessages from './state-messages'
import deliveryModeMessages from './delivery-mode-messages'
import productMessages from './product-messages'
import ingredientMessages from './ingredient-messages'
import categoryMessages from './category-messages'
import orderMessages from './order-messages'
import paymentMessages from './payment-messages'
import cartMessages from './cart-messages'
import merge from 'deepmerge'

const messages = merge.all([
    coreMessages,
    emptyMessages,
    stateMessages,
    deliveryModeMessages,
    productMessages,
    ingredientMessages,
    categoryMessages,
    orderMessages,
    paymentMessages,
    cartMessages
])

export default messages
