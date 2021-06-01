<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <calendar-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import CalendarShowData from "./CalendarShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "CalendarShow",
        components: {CrudShow, CalendarShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'calendar.calendar.showing',
            }
        },
    }
</script>

