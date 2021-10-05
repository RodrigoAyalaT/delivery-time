<template>
  <v-card height="100%">
    <v-card-title class="py-2">Orden</v-card-title>
    <v-row dense >
      <v-col cols="12">
        <show-field
            :value="number.toString()"
            label="Número"
            icon="tag"
        />

      </v-col>
      <v-col cols="12">
        <show-field
            :value="$t('delivery.states.'+state)"
            label="Estado"
            :icon="getIcon"
        />
      </v-col>
      <v-col cols="12">
        <v-card-text class="text-center pb-0  align-self-center">
          <v-alert dense text :icon="false" type="info">{{ $t('delivery.statesDescription.' + state) }}</v-alert>
        </v-card-text>
      </v-col>
    </v-row>




  </v-card>
</template>

<script>
import {ShowField} from "@dracul/common-frontend"

export default {
  name: "ShowOrderState",
  components: {ShowField},
  props: {
    state: String,
    identifier: String,
    number: Number
  },
  computed: {
    getIcon() {
      switch (this.state) {
        case 'PENDING_RECEIPT':
          return 'receipt'
        case 'NEW':
          return 'pending_actions'
        case 'PREPARING':
          return 'outdoor_grill'
        case 'READY':
          return 'new_releases'
        case 'ON_THE_WAY':
          return 'delivery_dining'
        case 'DELIVERED':
          return 'task_alt'
        default:
          return 'grid_view'
      }
    }
  }
}
</script>

<style scoped>

</style>
