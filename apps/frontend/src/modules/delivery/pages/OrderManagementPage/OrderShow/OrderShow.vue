<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <order-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import OrderShowData from "./OrderShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "OrderShow",
        components: {CrudShow, OrderShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'delivery.order.showing',
            }
        },
    }
</script>

