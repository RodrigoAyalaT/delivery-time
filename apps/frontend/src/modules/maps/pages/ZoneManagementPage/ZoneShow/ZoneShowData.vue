<template>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.name" :label="$t('maps.zone.labels.name')" icon="title"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <show-field :value="item.color" :label="$t('maps.zone.labels.color')" icon="palette"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
              <show-field :value="item.value.toString()" :label="$t('maps.zone.labels.color')" icon="palette"/>
            </v-list>
        </v-col>

    </v-row>
</template>
<script>
    import {ShowField} from '@dracul/common-frontend'


    export default {
        name: 'ZoneShowData',
        components: {ShowField},

        props: {
            item: {type: Object, required: true}
        }
    }
</script>

