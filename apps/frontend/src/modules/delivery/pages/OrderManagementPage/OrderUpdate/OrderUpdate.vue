<template>
  <crud-update :open="open"
               :loading="loading"
               :title="title"
               :errorMessage="errorMessage"
               @update="update"
               @close="$emit('close')"
  >
    <order-form ref="form" v-model="form" :input-errors="inputErrors"/>
  </crud-update>
</template>

<script>

import OrderProvider from "../../../providers/OrderProvider";

import {CrudUpdate, ClientError} from '@dracul/common-frontend'

import OrderForm from "../OrderForm";


export default {
  name: "OrderUpdate",

  components: {OrderForm, CrudUpdate},

  props: {
    open: {type: Boolean, default: true},
    item: {type: Object, required: true}
  },

  data() {
    return {
      title: 'delivery.order.editing',
      errorMessage: '',
      inputErrors: {},
      loading: false,
      form: {
        id: this.item.id,
        contact: this.item.contact,
        location: this.item.location,
        state: this.item.state,
        identifier: this.item.identifier
      }
    }
  },
  methods: {
    update() {
      if (this.$refs.form.validate()) {
        this.loading = true
        OrderProvider.updateOrder(this.form).then(r => {
              if (r) {
                this.$emit('itemUpdated', r.data.orderUpdate)
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

