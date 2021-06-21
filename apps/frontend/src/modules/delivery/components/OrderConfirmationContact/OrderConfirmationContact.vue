<template>
  <card-edit @edit="$emit('edit')">
    <v-card-title>
      {{$t('delivery.contact')}}
    </v-card-title>
  <v-list>
    <v-row dense>

      <v-col cols="12" md="6">
        <show-field
            :value="$store.state.delivery.order.contact.name"
            :label="$t('delivery.order.labels.name')"
            icon="badge"
        />
      </v-col>

      <v-col cols="12" md="6">
        <show-field
            :value="$store.state.delivery.order.contact.phone"
            :label="$t('delivery.order.labels.phone')"
            icon="phone"
        />
      </v-col>

      <v-col cols="12" md="6">
        <show-field
            :value="$store.state.delivery.order.contact.email"
            :label="$t('delivery.order.labels.email')"
            icon="email"
        />
      </v-col>

      <v-col cols="12" md="6">
        <show-field
            :value="$store.state.delivery.order.contact.observation"
            :label="$t('delivery.order.labels.observations')"
            icon="description"
        />
      </v-col>

    </v-row>




  </v-list>
  </card-edit>
</template>

<script>
import {ShowField} from '@dracul/common-frontend'
import CardEdit from "@/modules/delivery/components/CardEdit/CardEdit";

export default {
  name: "OrderConfirmationContact",
  components: {CardEdit, ShowField},
}
</script>

<style scoped>

</style>
