import ProductManagementPage from '../pages/ProductManagementPage'
import OrderManagementPage from '../pages/OrderManagementPage'
import OrderPage from '../pages/OrderPage'
import OrderSidePage from '../pages/OrderSidePage'
import IngredientManagementPage from '../pages/IngredientManagementPage'

const routes = [
    {name: 'root', path: '/', redirect: OrderSidePage},
    {name: 'ProductManagementPage', path: '/product-management', component: ProductManagementPage},
    {name: 'OrderManagementPage', path: '/order-management', component: OrderManagementPage},
    {name: 'IngredientManagementPage', path: '/ingredient-management', component: IngredientManagementPage},
    {name: 'OrderPage', path: '/order', component: OrderPage},
    {name: 'OrderSidePage', path: '/order-side', component: OrderSidePage}
]

export default routes;
