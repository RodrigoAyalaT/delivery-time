import ProductManagementPage from '../pages/ProductManagementPage'
import OrderManagementPage from '../pages/OrderManagementPage'
import OrderPage from '../pages/OrderPage'
import IngredientManagementPage from '../pages/IngredientManagementPage'

const routes = [
    {name: 'root', path: '/', redirect: OrderPage},
    {name: 'ProductManagementPage', path: '/product-management', component: ProductManagementPage},
    {name: 'OrderManagementPage', path: '/order-management', component: OrderManagementPage},
    {name: 'IngredientManagementPage', path: '/ingredient-management', component: IngredientManagementPage},
    {name: 'OrderPage', path: '/order-side', component: OrderPage},
]

export default routes;
