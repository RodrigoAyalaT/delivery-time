<template>
  <v-form ref="form" autocomplete="off" @submit.prevent="save">
    <v-row>

      <v-col cols="12" sm="6">
        <v-text-field

            prepend-icon="title"
            name="name"
            v-model="form.name"
            :label="$t('delivery.productCategory.labels.name')"
            :placeholder="$t('delivery.productCategory.labels.name')"
            :error="hasInputErrors('name')"
            :error-messages="getInputErrors('name')"
            color="secondary"
            :rules="required"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <color-input
            v-model="form.backgroundColor"
            :label="$t('delivery.productCategory.labels.backgroundColor')"
            :placeholder="$t('delivery.productCategory.labels.backgroundColor')"
            color="secondary"
        ></color-input>
      </v-col>


      <v-col cols="12" sm="6">
        <color-input
            v-model="form.borderColor"
            :label="$t('delivery.productCategory.labels.borderColor')"
            :placeholder="$t('delivery.productCategory.labels.borderColor')"
            color="secondary"
        ></color-input>
      </v-col>

      <v-col cols="12" sm="6">
        <color-input
            v-model="form.fontColor"
            :label="$t('delivery.productCategory.labels.fontColor')"
            :placeholder="$t('delivery.productCategory.labels.fontColor')"
            color="secondary"
        ></color-input>
      </v-col>

    </v-row>
  </v-form>
</template>

<script>

import {InputErrorsByProps, RequiredRule, ColorInput} from '@dracul/common-frontend'


export default {
  name: "ProductCategoryForm",
  mixins: [InputErrorsByProps, RequiredRule],
  components: {ColorInput},
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

