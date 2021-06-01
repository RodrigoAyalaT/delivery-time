<template>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.name" :label="$t('calendar.calendar.labels.name')" icon="edit_calendar"/>
                 <show-field :value="item.user ? item.user.username: ''" :label="$t('calendar.calendar.labels.user')" icon="account_circle"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.description" :label="$t('calendar.calendar.labels.description')" icon="description"/>
                 <show-field :value="String(item.priority)" :label="$t('calendar.calendar.labels.priority')" icon="sort"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.identifier" :label="$t('calendar.calendar.labels.identifier')" icon="fingerprint"/>
            </v-list>
        </v-col>

    </v-row>
</template>
<script>
    import {ShowField} from '@dracul/common-frontend'


    export default {
        name: 'CalendarShowData',
        components: {ShowField},

        props: {
            item: {type: Object, required: true}
        }
    }
</script>

