<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <product-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import ProductShowData from "./ProductShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "ProductShow",
        components: {CrudShow, ProductShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'delivery.product.showing',
            }
        },
    }
</script>

