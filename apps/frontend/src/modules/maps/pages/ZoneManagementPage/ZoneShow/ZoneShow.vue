<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <zone-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import ZoneShowData from "./ZoneShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "ZoneShow",
        components: {CrudShow, ZoneShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'maps.zone.showing',
            }
        },
    }
</script>

