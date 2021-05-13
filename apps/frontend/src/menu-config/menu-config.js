
export default [
    {
        icon: 'home',
        text:'base.home',
        link: { name: "home" },
        panel: false
    },
    {
        icon: 'person',
        text: 'Gestion',
        children: [
            {
                icon: 'production_quantity_limits',
                text: 'menu.products',
                link: {name: "ProductManagementPage"},
                panel: false,
                permission: 'PRODUCT_SHOW'
            },
            {
                icon: 'tag',
                text: 'menu.orders',
                link: {name: "OrderManagementPage"},
                permission: 'ORDER_SHOW'
            },
        ]
    },
    {
        icon: 'maps',
        text: 'Maps',
        children: [
            {
                icon: 'satellite',
                text: 'menu.zone',
                link: {name: "ZoneManagementPage"},
                permission: 'ZONE_SHOW'
            },
            {
                icon: 'location_on',
                text: 'menu.location',
                link: {name: "LocationManagementPage"},
                permission: 'LOCATION_SHOW'
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
    {
        icon: 'perm_phone_msg',
        text: 'base.about',
        link: { name: "about" },
        panel: false,
    },


]
