<template>
  <crud-create :open="open"
               :loading="loading"
               :title="title"
               :errorMessage="errorMessage"
               @create="create"
               @close="$emit('close')"
  >
    <zone-form ref="form" v-model="form" :input-errors="inputErrors"/>
  </crud-create>
</template>

<script>

import ZoneProvider from "../../../providers/ZoneProvider";

import {CrudCreate, ClientError} from '@dracul/common-frontend'

import ZoneForm from "../ZoneForm";


export default {
  name: "ZoneCreate",

  components: {ZoneForm, CrudCreate},

  props: {
    open: {type: Boolean, default: true}
  },

  data() {
    return {
      title: 'maps.zone.creating',
      errorMessage: '',
      inputErrors: {},
      loading: false,
      form: {
        name: '',
        color: '',
        value: null,
        location: {
          type: 'Polygon',
          coordinates: null
        }
      }
    }
  },

  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.loading = true
        ZoneProvider.createZone(this.form).then(r => {
              if (r) {
                this.$emit('itemCreated', r.data.zoneCreate)
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

