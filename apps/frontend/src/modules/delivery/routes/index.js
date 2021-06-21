
import OrderManagementPage from '../pages/OrderManagementPage'
import OrderPage from '../pages/OrderPage'
import OrderViewPage from '../pages/OrderViewPage'
import OrderResetPage from '../pages/OrderResetPage'
import OrderManagerPage from '../pages/OrderManagerPage'
import IngredientManagementPage from '../pages/IngredientManagementPage'
import ProductCategoryManagementPage from '../pages/ProductCategoryManagementPage'

import ProductCustomManagementPage from '../pages/ProductCustomManagementPage'

const routes = [
   // {name: 'root', path: '/', redirect: OrderPage},
    {name: 'ProductManagementPage', path: '/product-management', component: ProductCustomManagementPage},
    {name: 'OrderManagementPage', path: '/order-management', component: OrderManagementPage},
    {name: 'IngredientManagementPage', path: '/ingredient-management', component: IngredientManagementPage},
    {name: 'ProductCategoryManagementPage', path: '/product-category-management', component: ProductCategoryManagementPage},

    {name: 'OrderPage', path: '/order', component: OrderPage},
    {name: 'OrderViewPage', path: '/order/:identifier', component: OrderViewPage},
    {name: 'OrderResetPage', path: '/order-reset', component: OrderResetPage},
    {name: 'OrderManagerPage', path: '/order-manager', component: OrderManagerPage},
]

export default routes;
