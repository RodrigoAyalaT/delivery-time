const messages = {
    en: {
        delivery: {
            contact: 'Contact',
            destination: 'Destination',
            checkAndConfirm: 'Order confirmation',
            checkAndConfirmDescription: 'Please, check that your data and order are correct',
            myOrder: 'My order',
            orderView: 'Order #{identifier}',
            emptyOrder: 'Your order is empty',
            schedule: 'Schedule', //Horario
            noPendingOrders: '',
            empty: {
                items: 'Your order is empty',
                deliveryMode: 'You must choose the delivery mode "take away" or "delivery".',
                time: 'You must choose the delivery time',
                location: 'You must indicate your address'
            },

            cart: {
                total: 'Total price',
                quantity: 'Items quantity'
            },
            scheduleTime: {
                noOptions: 'No schedules available'
            },
            states: {
                NEW: 'New',
                PREPARING: 'Preparing',
                READY: 'ready',
                ON_THE_WAY: 'On the way',
                DELIVERED: 'Delivered'
            },
            mode: {
                mode: 'Mode',
                TAKE_AWAY: 'Take Away',
                DELIVERY: 'Delivery',
                takeAway: 'Take Away',
                delivery: 'Delivery',
                asSonAsPosible: 'As son as posible',
                scheduledWithdrawal: 'Scheduled',
                estimatedTime: "Estimated time {hour}",
                deliveryTime: "Delivery time"
            },
            product: {
                products: 'Products',
                title: 'Product management',
                subtitle: 'View, search, create, edit and delete Product',
                creating: 'Creating Product',
                editing: 'Editing Product',
                deleting: 'Deleting Product',
                showing: 'Showing Product',
                search: 'Search...',
                labels: {
                    name: 'Name',
                    description: 'Description',
                    image: 'Image',
                    price: 'Price',
                    stock: 'Stock',
                    active: 'Active',
                    ingredients: 'Ingredients',
                    category: 'Category'
                },

            },
            order: {
                title: 'Order management',
                subtitle: 'View, search, create, edit and delete Order',
                creating: 'Creating Order',
                editing: 'Editing Order',
                deleting: 'Deleting Order',
                showing: 'Showing Order',
                labels: {
                    order: 'order',
                    name: 'Name',
                    phone: 'Phone',
                    email: 'Email',
                    observations: 'Observations',
                    address: 'Address',
                    state: 'State',
                    identifier: 'Identifier'
                },

            },
            ingredient: {
                title: 'Ingredient management',
                subtitle: 'View, search, create, edit and delete Ingredient',
                creating: 'Creating Ingredient',
                editing: 'Editing Ingredient',
                deleting: 'Deleting Ingredient',
                showing: 'Showing Ingredient',
                labels: {
                    name: 'Name'
                },

            },
            productCategory: {
                title: 'ProductCategory management',
                subtitle: 'View, search, create, edit and delete ProductCategory',
                creating: 'Creating ProductCategory',
                editing: 'Editing ProductCategory',
                deleting: 'Deleting ProductCategory',
                showing: 'Showing ProductCategory',
                labels: {
                    name: 'Name'
                },

            }
        }
    },
    es: {
        delivery: {
            contact: 'Contacto',
            destination: 'Destino',
            checkAndConfirm: 'Confirmación de pedido',
            checkAndConfirmDescription: 'Por favor, revisá que tus datos y pedido esten bien',
            myOrder: 'Mi pedido',
            orderView: 'Orden #{identifier}',
            emptyOrder: 'Su pedido esta vacío',
            schedule: 'Horario', //Horario

            empty: {
                items: 'Su pedido esta vacío',
                deliveryMode: 'Debe elegir el modo de envío "take away" o "delivery".',
                time: 'Debes elegir la hora de entrega',
                location: 'Debes indicar tu dirección'
            },

            cart: {
                total: 'Monto total',
                quantity: 'Cantidad total'
            },
            scheduleTime: {
                noOptions: 'Sin horarios disponibles'
            },
            states: {
                NEW: 'Ingresada',
                PREPARING: 'Preparando',
                READY: 'Listo',
                ON_THE_WAY: 'En camino',
                DELIVERED: 'Entregado'
            },
            mode: {
                mode: 'Modo',
                TAKE_AWAY: 'Retiro en local',
                DELIVERY: 'Delivery',
                takeAway: 'Retiro en local',
                delivery: 'Delivery',
                asSonAsPosible: 'Lo antes posible',
                scheduledWithdrawal: 'Programado',
                estimatedTime: "Hora estimada {hour}",
                deliveryTime: "Hora de entrega"
            },
            product: {
                products: 'Productos',
                title: 'Administración de Product',
                subtitle: 'Ver, buscar, crear, editar, y borrar Product',
                creating: 'Creando Product',
                editing: 'Modificando Product',
                deleting: 'Eliminando Product',
                showing: 'Detalles de Product',
                search: 'Buscar...',
                labels: {
                    name: 'Nombre',
                    description: 'Descripción',
                    image: 'Imagen',
                    price: 'Precio',
                    stock: 'Existencias',
                    active: 'Activo',
                    ingredients: 'Ingredientes',
                    category: 'Categoría'
                },

            },
            order: {
                title: 'Administración de Orden',
                subtitle: 'Ver, buscar, crear, editar, y borrar Orden',
                creating: 'Creando Orden',
                editing: 'Modificando Orden',
                deleting: 'Eliminando Orden',
                showing: 'Detalles de Orden',
                labels: {
                    order: 'Orden',
                    name: 'Nombre',
                    phone: 'Teléfono',
                    email: 'Email',
                    observations: 'Observaciones',
                    address: 'Dirección',
                    state: 'Estado',
                    identifier: 'Identificador'
                },

            },
            ingredient: {
                title: 'Administración de Ingredient',
                subtitle: 'Ver, buscar, crear, editar, y borrar Ingredient',
                creating: 'Creando Ingredient',
                editing: 'Modificando Ingredient',
                deleting: 'Eliminando Ingredient',
                showing: 'Detalles de Ingredient',
                labels: {
                    name: 'Nombre'
                },

            },
            productCategory: {
                title: 'Administración de ProductCategory',
                subtitle: 'Ver, buscar, crear, editar, y borrar ProductCategory',
                creating: 'Creando ProductCategory',
                editing: 'Modificando ProductCategory',
                deleting: 'Eliminando ProductCategory',
                showing: 'Detalles de ProductCategory',
                labels: {
                    name: 'Nombre'
                },

            }
        }
    },
    pt: {
        delivery: {
            contact: 'Contato',
            destination: 'Destino',
            checkAndConfirm: 'Confirmación de pedido',
            checkAndConfirmDescription: 'Por favor, revisá que tus datos y pedido esten bien',
            myOrder: 'O meu pedido',
            orderView: 'Pedido #{identifier}',
            emptyOrder: 'seu pedido está vazio',
            schedule: 'Cronograma', //Horario

            empty: {
                items: 'Su pedido esta vacío',
                deliveryMode: 'Debe elegir el modo de envío "take away" o "delivery".',
                time: 'Debes elegir la hora de entrega',
                location: 'Debes indicar tu dirección'
            },


            cart: {
                total: 'Monto total',
                quantity: 'Cantidad de items'
            },
            scheduleTime: {
                noOptions: 'Sem horários disponíveis'
            },
            states: {
                NEW: 'Nuevo',
                PREPARING: 'Preparando',
                READY: 'Listo',
                ON_THE_WAY: 'En camino',
                DELIVERED: 'Entregado'
            },
            mode: {
                mode: 'Mode',
                TAKE_AWAY: 'Retiro en local',
                DELIVERY: 'Delivery',
                takeAway: 'Retiro en local',
                delivery: 'Delivery',
                asSonAsPosible: 'Lo antes posible',
                scheduledWithdrawal: 'Programado',
                estimatedTime: "Tempo estimado {hour}",
                deliveryTime: "tempo de entrega"
            },
            product: {
                products: 'Products',
                title: 'Administração de Product',
                subtitle: 'Ver, buscar, criar, editar e usar Product',
                creating: 'Criando Product',
                editing: 'Edição Product',
                deleting: 'Apagando Product',
                showing: 'Detalhes do Product',
                search: 'Search...',
                labels: {
                    name: 'Nome',
                    description: 'Descripción',
                    image: 'Imagen',
                    price: 'Precio',
                    stock: 'Existencias',
                    active: 'Activo',
                    ingredients: 'Ingredients',
                    category: 'Categoria'
                },

            },
            order: {
                title: 'Administração de Order',
                subtitle: 'Ver, buscar, criar, editar e usar Order',
                creating: 'Criando Order',
                editing: 'Edição Order',
                deleting: 'Apagando Order',
                showing: 'Detalhes do Order',
                labels: {
                    order: 'Order',
                    name: 'Nome',
                    phone: 'Telefono',
                    email: 'Email',
                    observations: 'Observações',
                    address: 'Dirección',
                    state: 'Estado',
                    identifier: 'Identificador'
                },

            },
            ingredient: {
                title: 'Administração de Ingredient',
                subtitle: 'Ver, buscar, criar, editar e usar Ingredient',
                creating: 'Criando Ingredient',
                editing: 'Edição Ingredient',
                deleting: 'Apagando Ingredient',
                showing: 'Detalhes do Ingredient',
                labels: {
                    name: 'Nome'
                },

            },
            productCategory: {
                title: 'Administração de ProductCategory',
                subtitle: 'Ver, buscar, criar, editar e usar ProductCategory',
                creating: 'Criando ProductCategory',
                editing: 'Edição ProductCategory',
                deleting: 'Apagando ProductCategory',
                showing: 'Detalhes do ProductCategory',
                labels: {
                    name: 'Nome'
                },

            }
        }
    }
}

export default messages
