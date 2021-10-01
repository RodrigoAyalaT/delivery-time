<template>
  <card-edit @edit="$emit('edit')">
    <v-card-title>
      {{$t('delivery.contact')}}
    </v-card-title>
    <v-row dense>

      <v-col cols="12" md="4">
        <show-field
            :value="$store.state.delivery.order.contact.name"
            :label="$t('delivery.order.labels.name')"
            icon="badge"
        />
      </v-col>

      <v-col cols="12" md="4">
        <show-field
            :value="$store.state.delivery.order.contact.phone"
            :label="$t('delivery.order.labels.phone')"
            icon="phone"
        />
      </v-col>

      <v-col cols="12" md="4">
        <show-field
            :value="$store.state.delivery.order.contact.email"
            :label="$t('delivery.order.labels.email')"
            icon="email"
        />
      </v-col>

      <v-col v-if="$store.state.delivery.order.contact.observation" cols="12" md="12">
        <show-field
            :value="$store.state.delivery.order.contact.observation"
            :label="$t('delivery.order.labels.observations')"
            icon="description"
        />
      </v-col>

    </v-row>

<v-divider></v-divider>


  </card-edit>
</template>

<script>
import {ShowField} from '@dracul/common-frontend'
import CardEdit from "@/modules/delivery/components/CardEdit/CardEdit";

export default {
  name: "OrderReviewContact",
  components: {CardEdit, ShowField},
}
</script>

<style scoped>

</style>
