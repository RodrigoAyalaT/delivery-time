<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <product-category-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import ProductCategoryShowData from "./ProductCategoryShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "ProductCategoryShow",
        components: {CrudShow, ProductCategoryShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'delivery.productCategory.showing',
            }
        },
    }
</script>

