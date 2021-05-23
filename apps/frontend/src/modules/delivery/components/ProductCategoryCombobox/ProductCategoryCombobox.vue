<template>
  <v-select
      prepend-inner-icon="category"
      :items="items"
      :item-text="'name'"
      :item-value="'id'"
      v-model="item"
      :label="$t('delivery.product.labels.category')"
      :loading="loading"
      :error="hasInputErrors('category')"
      :error-messages="getInputErrors('category')"
      color="secondary"
      item-color="secondary"
      :rules="isRequired ? required : []"
      :hide-details="hideDetails"
      :solo="solo"
      :clearable="clearable"
  ></v-select>

</template>

<script>

import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'


import ProductCategoryProvider from "../../providers/ProductCategoryProvider"

export default {
  name: "ProductCategoryCombobox",
  mixins: [InputErrorsByProps, RequiredRule],
  props: {
    value: {type: [String, Array]},
    hideDetails: {type: Boolean, default: false},
    solo: {type: Boolean, default: false},
    clearable: {type: Boolean, default: false},
    isRequired:  {type: Boolean, default: true},
  },
  data() {
    return {
      items: [],
      loading: false
    }
  },
  computed: {
    item: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    fetch() {
      this.loading = true
      ProductCategoryProvider.fetchProductCategories().then(r => {
        this.items = r.data.productCategoryFetch
      }).catch(err => console.error(err))
          .finally(() => this.loading = false)
    }

  }
}
</script>

<style scoped>

</style>

