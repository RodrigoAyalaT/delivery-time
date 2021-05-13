<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <ingredient-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import IngredientShowData from "./IngredientShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "IngredientShow",
        components: {CrudShow, IngredientShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'delivery.ingredient.showing',
            }
        },
    }
</script>

