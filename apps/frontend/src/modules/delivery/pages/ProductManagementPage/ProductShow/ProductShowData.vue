<template>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.name" :label="$t('delivery.product.labels.name')" icon="takeout_dining"/>
                 <show-field :value="String(item.price)" :label="$t('delivery.product.labels.price')" icon="price_change"/>
                 <show-field :value="item.ingredients.map(i => i.name).join(', ')" :label="$t('delivery.product.labels.ingredients')" icon="colorize"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.description" :label="$t('delivery.product.labels.description')" icon="description"/>
                 <show-field :value="String(item.stock)" :label="$t('delivery.product.labels.stock')" icon="inventory_2"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.image" :label="$t('delivery.product.labels.image')" icon="photo_camera"/>
                 <show-field :value="item.active" :label="$t('delivery.product.labels.active')" icon="toggle_on"/>
            </v-list>
        </v-col>

    </v-row>
</template>
<script>
    import {ShowField} from '@dracul/common-frontend'
     
    
    export default {
        name: 'ProductShowData',
        components: {ShowField},
        
        props: {
            item: {type: Object, required: true}
        }
    }
</script>

