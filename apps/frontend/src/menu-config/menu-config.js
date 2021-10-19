
export default [
    {
        icon: 'home',
        text:'base.home',
        link: { name: "home" },
        panel: false
    },
    {
        icon: 'table_bar',
        text: 'menu.orderBar',
        link: {name: "OrderBarPage"},
        permission: 'ORDER_SHOW_BAR'
    },
    {
        icon: 'microwave',
        text: 'menu.kitchenOrders',
        link: {name: "OrderManagerKitchenPage"},
        permission: 'ORDER_SHOW_KITCHEN'
    },
    {
        icon: 'tag',
        text: 'menu.orders',
        link: {name: "OrderManagerPage"},
        permission: 'ORDER_SHOW'
    },

    {
        icon: 'point_of_sale',
        text: 'menu.orderCashRegister',
        link: {name: "OrderCashRegisterPage"},
        permission: 'ORDER_SHOW'
    },
    {
        icon: 'restart_alt',
        text: 'menu.restartOrder',
        link: {name: "OrderResetPage"},
        permission: 'ORDER_SHOW'
    },
    {
        icon: 'person',
        text: 'Gestion',
        permission: 'PRODUCT_CREATE',
        children: [
            {
                icon: 'production_quantity_limits',
                text: 'menu.products',
                link: {name: "ProductManagementPage"},
                panel: false,
                permission: 'PRODUCT_CREATE'
            },
            {
                icon: 'category',
                text: 'menu.categories',
                link: {name: "ProductCategoryManagementPage"},
                panel: false,
                permission: 'PRODUCTCATEGORY_CREATE'
            },
            {
                icon: 'colorize',
                text: 'menu.ingredients',
                link: {name: "IngredientManagementPage"},
                panel: false,
                permission: 'INGREDIENT_CREATE'
            },

            {
                icon: 'settings',
                text: 'menu.settings',
                link: {name: "SettingsPage"},
                permission: 'SETTINGS_UPDATE'
            },
            {
                icon: 'edit_calendar',
                text: 'calendar.calendar.menu.calendar',
                link: {name: "CalendarSchedulePage", params: {identifier: 'horario-atencion'}},
                permission: 'CALENDAR_UPDATE'
            },

            {
                icon: 'paid',
                text: 'menu.paymentMethods',
                link: {name: "PaymentMethodsPage"},
                permission: 'METHOD_SHOW'
            },
        ]
    },
    {
        icon: 'maps',
        text: 'maps.menu.maps',
        permission: 'ZONE_CREATE',
        children: [
            {
                icon: 'satellite',
                text: 'maps.menu.zones',
                link: {name: "ZoneManagementPage"},
                permission: 'ZONE_CREATE'
            },
            {
                icon: 'location_on',
                text: 'maps.menu.locations',
                link: {name: "LocationManagementPage"},
                permission: 'LOCATION_CREATE'
            },
        ]
    },
    {
        icon: 'person',
        text: 'menu.administration',
        panel: false,
        permission: 'SECURITY_ADMIN_MENU',
        children: [
            {
                icon: 'assignment_ind',
                text: 'menu.userdashboard',
                link: { name: "userDashboard" },
                panel: false,
                permission: 'SECURITY_DASHBOARD_SHOW'
            },
            {
                icon: 'settings_applications',
                text: 'menu.customization',
                link: { name: "customization" },
                panel: false,
                permission: 'CUSTOMIZATION_SHOW'
            },
            {
                icon: 'assignment_ind',
                text: 'user.title',
                link: { name: "userManagement" },
                panel: false,
                permission: 'SECURITY_USER_SHOW'
            },
            {
                icon: 'verified_user',
                text: 'role.title',
                link: { name: "roleManagement" },
                panel: false,
                permission: 'SECURITY_ROLE_SHOW'
            },
            {
                icon: 'group',
                text: 'group.title',
                link: { name: "groupManagement" },
                panel: false,
                permission: 'SECURITY_GROUP_SHOW'
            },

        ]
    },
/*    {
        icon: 'perm_phone_msg',
        text: 'base.about',
        link: { name: "about" },
        panel: false,
    },*/


]
