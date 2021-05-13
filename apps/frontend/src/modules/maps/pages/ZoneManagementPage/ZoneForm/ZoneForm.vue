<template>
  <v-form ref="form" autocomplete="off" @submit.prevent="save">
    <v-row>


      <v-col cols="12" sm="6">
        <v-text-field

            prepend-icon="title"
            name="name"
            v-model="form.name"
            :label="$t('maps.zone.labels.name')"
            :placeholder="$t('maps.zone.labels.name')"
            :error="hasInputErrors('name')"
            :error-messages="getInputErrors('name')"
            color="secondary"
            :rules="required"
        ></v-text-field>
      </v-col>


      <v-col cols="12" sm="6">
        <v-text-field

            prepend-icon="palette"
            name="color"
            v-model="form.color"
            :label="$t('maps.zone.labels.color')"
            :placeholder="$t('maps.zone.labels.color')"
            :error="hasInputErrors('color')"
            :error-messages="getInputErrors('color')"
            color="secondary"

        ></v-text-field>
      </v-col>

      <v-col  cols="12">
        <zone-map
            v-model="form.location.coordinates"
        >
        </zone-map>
      </v-col>

    </v-row>
  </v-form>
</template>

<script>

import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
import ZoneMap from "@/modules/maps/components/ZoneMap/ZoneMap";


export default {
  name: "ZoneForm",
  components: {ZoneMap},
  mixins: [InputErrorsByProps, RequiredRule],

  props: {
    value: {
      type: Object,
      required: true
    },
  },
  computed: {
    form: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    form: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>

