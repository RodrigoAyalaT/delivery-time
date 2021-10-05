<template>
  <v-card :flat="flat">
    <v-card-title class="py-2">
      {{ $t(title) }}
    </v-card-title>
    <v-row no-gutters>

      <v-col cols="12" md="4">
        <show-field
            :value="order.contact.name"
            :label="$t('delivery.order.labels.name')"
            icon="badge"
        />
      </v-col>

      <v-col cols="12" md="4">
        <show-field
            :value="order.contact.phone"
            :label="$t('delivery.order.labels.phone')"
            icon="phone"
        />
      </v-col>

      <v-col cols="12" md="4">
        <show-field
            :value="order.contact.email"
            :label="$t('delivery.order.labels.email')"
            icon="email"
        />
      </v-col>

      <v-col v-if="order.contact.observation" cols="12" md="12">
        <show-field
            :value="order.contact.observation"
            :label="$t('delivery.order.labels.observations')"
            icon="description"
        />
      </v-col>

    </v-row>

    <v-divider v-if="divider"></v-divider>


  </v-card>
</template>

<script>
import {ShowField} from '@dracul/common-frontend'

export default {
  name: "OrderContact",
  components: { ShowField},
  props: {
    order: {type: Object},
    title: {type: String, default: 'delivery.contact'},
    divider: {type:Boolean, default: false},
    flat: {type:Boolean, default: false},
  }
}
</script>

<style scoped>

</style>
