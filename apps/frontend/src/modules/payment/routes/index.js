import PaymentMethodsPage from '../pages/PaymentMethodsPage'

const routes = [
     {
          name: 'PaymentMethodsPage',
          path: '/payment-methods',
          component: PaymentMethodsPage,
          meta: {
               requiresAuth: true,
               permission: "METHOD_UPDATE"
          }
     }
]

export default routes;
