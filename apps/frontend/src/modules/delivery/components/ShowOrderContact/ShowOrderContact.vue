<template>
  <v-card   class="grey--text text--darken-2">
    <v-card-title>
      {{ $t('delivery.contact') }}
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-row dense>
          <v-col cols="12" md="6">
            <show-field
                :value="name"
                :label="$t('delivery.order.labels.name')"
                icon="badge"
            />
          </v-col>

          <v-col cols="12" md="6">
            <show-field
                :value="phone"
                :label="$t('delivery.order.labels.phone')"
                icon="phone"
            />
          </v-col>
          <v-col cols="12" md="6">
            <show-field
                :value="email"
                :label="$t('delivery.order.labels.email')"
                icon="email"
            />
          </v-col>
          <v-col cols="12" md="6">
            <show-field
                :value="observation"
                :label="$t('delivery.order.labels.observations')"
                icon="description"
            />
          </v-col>
        </v-row>
      </v-list>
    </v-card-text>

  </v-card>
</template>

<script>
import {ShowField} from '@dracul/common-frontend'

export default {
  name: "ShowOrderContact",
  components: {ShowField},
  props: {
    name: {type: String},
    phone: {type: String},
    email: {type: String},
    observation: {type: String},
  }
}
</script>

<style scoped>

</style>
