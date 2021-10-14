import OrderManagementPage from '../pages/OrderManagementPage'
import OrderPage from '../pages/OrderPage'
import OrderBarPage from '../pages/OrderBarPage'
import OrderViewPage from '../pages/OrderViewPage'
import OrderResetPage from '../pages/OrderResetPage'

import OrderManagerPage from '../pages/OrderManagerPage'
import OrderManagerKitchenPage from '../pages/OrderManagerKitchenPage'
import OrderManagerBarPage from '../pages/OrderManagerBarPage'

import IngredientManagementPage from '../pages/IngredientManagementPage'
import ProductCategoryManagementPage from '../pages/ProductCategoryManagementPage'

import ProductCustomManagementPage from '../pages/ProductCustomManagementPage'
import OrderCashRegisterPage from '../pages/OrderCashRegisterPage'

const routes = [
    // {name: 'root', path: '/', redirect: OrderPage},
    {
        name: 'ProductManagementPage',
        path: '/product-management',
        component: ProductCustomManagementPage,
        meta: {
            requiresAuth: true,
            permission: "PRODUCT_UPDATE"
        }
    },
    {
        name: 'OrderManagementPage',
        path: '/order-management',
        component: OrderManagementPage,
        meta: {
            requiresAuth: true,
            permission: "ORDER_UPDATE"
        }
    },
    {
        name: 'IngredientManagementPage',
        path: '/ingredient-management',
        component: IngredientManagementPage,
        meta: {
            requiresAuth: true,
            permission: "INGREDIENT_UPDATE"
        }
    },
    {
        name: 'ProductCategoryManagementPage',
        path: '/product-category-management',
        component: ProductCategoryManagementPage,
        meta: {
            requiresAuth: true,
            permission: "PRODUCTCATEGORY_UPDATE"
        }
    },

    {
        name: 'OrderBarPage',
        path: '/order-bar',
        component: OrderBarPage,
        meta: {
            requiresAuth: true,
            permission: "ORDER_SHOW_BAR"
        }
    },
    {
        name: 'OrderPage',
        path: '/order',
        component: OrderPage,
        meta: {
            requiresAuth: false
        }
    },
    {
        name: 'OrderViewPage',
        path: '/order/:identifier',
        component: OrderViewPage,
        meta: {
            requiresAuth: false
        }
    },
    {
        name: 'OrderResetPage',
        path: '/order/reset',
        component: OrderResetPage,
        meta: {
            requiresAuth: true,
            permission: "ORDER_UPDATE"
        }
    },

    {
        name: 'OrderManagerPage',
        path: '/order/manager/all',
        component: OrderManagerPage,
        meta: {
            requiresAuth: true,
            permission: "ORDER_SHOW"
        }
    },

    {
        name: 'OrderManagerKitchenPage',
        path: '/order/manager/kitchen',
        component: OrderManagerKitchenPage,
        meta: {
            requiresAuth: true,
            permission: "ORDER_SHOW_KITCHEN"
        }
    },

    {
        name: 'OrderManagerBarPage',
        path: '/order/manager/bar',
        component: OrderManagerBarPage,
        meta: {
            requiresAuth: true,
            permission: "ORDER_SHOW_BAR"
        }
    },

    {
        name: 'OrderCashRegisterPage',
        path: '/order-cash-register',
        component: OrderCashRegisterPage,
        meta: {
            requiresAuth: true,
            permission: "ORDER_SHOW"
        }
    },
]

export default routes;
