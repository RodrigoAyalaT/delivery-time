<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <location-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import LocationShowData from "./LocationShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "LocationShow",
        components: {CrudShow, LocationShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'maps.location.showing',
            }
        },
    }
</script>

