<template>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.contact.name" :label="$t('delivery.order.labels.name')" icon="badge"/>
                 <show-field :value="item.location.address" :label="$t('delivery.order.labels.address')" icon="location_on"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.contact.phone" :label="$t('delivery.order.labels.phone')" icon="phone"/>
                 <show-field :value="item.state" :label="$t('delivery.order.labels.state')" icon="account_tree"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.contact.email" :label="$t('delivery.order.labels.email')" icon="email"/>
                 <show-field :value="item.identifier" :label="$t('delivery.order.labels.identifier')" icon="tag"/>
            </v-list>
        </v-col>

    </v-row>
</template>
<script>
    import {ShowField} from '@dracul/common-frontend'


    export default {
        name: 'OrderShowData',
        components: {ShowField},

        props: {
            item: {type: Object, required: true}
        }
    }
</script>

