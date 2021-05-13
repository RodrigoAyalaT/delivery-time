<template>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.address" :label="$t('maps.location.labels.address')" icon="location_on"/>
                 <show-field :value="String(item.latitude)" :label="$t('maps.location.labels.latitude')" icon="explore"/>
                 <show-field :value="item.province" :label="$t('maps.location.labels.province')" icon="villa"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.floor" :label="$t('maps.location.labels.floor')" icon="apartment"/>
                 <show-field :value="String(item.longitude)" :label="$t('maps.location.labels.longitude')" icon="explore"/>
                 <show-field :value="item.locality" :label="$t('maps.location.labels.locality')" icon="location_city"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.apartment" :label="$t('maps.location.labels.apartment')" icon="meeting_room"/>
                 <show-field :value="item.country" :label="$t('maps.location.labels.country')" icon="flag"/>
                 <show-field :value="item.postalCode" :label="$t('maps.location.labels.postalCode')" icon="local_shipping"/>
            </v-list>
        </v-col>

    </v-row>
</template>
<script>
    import {ShowField} from '@dracul/common-frontend'
     
    
    export default {
        name: 'LocationShowData',
        components: {ShowField},
        
        props: {
            item: {type: Object, required: true}
        }
    }
</script>

