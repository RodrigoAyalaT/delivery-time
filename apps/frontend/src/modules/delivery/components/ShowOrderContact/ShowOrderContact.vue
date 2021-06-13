<template>
  <card-edit @edit="$emit('edit')">
    <v-card-title>
      {{$t('delivery.contact')}}
    </v-card-title>
  <v-list>
    <show-field
        :value="$store.state.delivery.order.contact.name"
        :label="$t('delivery.order.labels.name')"
        icon="badge"
    />
    <show-field
        :value="$store.state.delivery.order.contact.phone"
        :label="$t('delivery.order.labels.phone')"
        icon="phone"
    />
    <show-field
        :value="$store.state.delivery.order.contact.email"
        :label="$t('delivery.order.labels.email')"
        icon="email"
    />
  </v-list>
  </card-edit>
</template>

<script>
import {ShowField} from '@dracul/common-frontend'
import CardEdit from "@/modules/delivery/components/CardEdit/CardEdit";

export default {
  name: "ShowOrderContact",
  components: {CardEdit, ShowField},
}
</script>

<style scoped>

</style>
