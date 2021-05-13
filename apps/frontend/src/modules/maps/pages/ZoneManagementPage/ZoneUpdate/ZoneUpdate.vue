<template>
  <crud-update :open="open"
               :loading="loading"
               :title="title"
               :errorMessage="errorMessage"
               @update="update"
               @close="$emit('close')"
  >
    <zone-form ref="form" v-model="form" :input-errors="inputErrors"/>
  </crud-update>
</template>

<script>

import ZoneProvider from "../../../providers/ZoneProvider";

import {CrudUpdate, ClientError} from '@dracul/common-frontend'

import ZoneForm from "../ZoneForm";


export default {
  name: "ZoneUpdate",

  components: {ZoneForm, CrudUpdate},

  props: {
    open: {type: Boolean, default: true},
    item: {type: Object, required: true}
  },

  data() {
    return {
      title: 'maps.zone.editing',
      errorMessage: '',
      inputErrors: {},
      loading: false,
      form: {
        id: this.item.id,
        name: this.item.name,
        color: this.item.color,
        location: {
          type: 'Polygon',
          coordinates: this.item.location.coordinates
        }
      }
    }
  },
  methods: {
    update() {
      if (this.$refs.form.validate()) {
        this.loading = true
        ZoneProvider.updateZone(this.form).then(r => {
              if (r) {
                this.$emit('itemUpdated', r.data.zoneUpdate)
                this.$emit('close')
              }
            }
        ).catch(error => {
          let clientError = new ClientError(error)
          this.inputErrors = clientError.inputErrors
          this.errorMessage = clientError.i18nMessage
        }).finally(() => this.loading = false)
      }

    }
  },
}
</script>

<style scoped>

</style>

