<template>

  <v-select

      multiple
      prepend-icon="colorize"
      :items="items"
      :item-text="'name'"
      :item-value="'id'"
      v-model="item"
      :label="$t('delivery.product.labels.ingredients')"
      :loading="loading"
      :error="hasInputErrors('ingredients')"
      :error-messages="getInputErrors('ingredients')"
      color="secondary"
      item-color="secondary"
      :hide-details="hideDetails"
  ></v-select>

</template>

<script>

import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'


import IngredientProvider from "../../providers/IngredientProvider"

export default {
  name: "IngredientCombobox",
  mixins: [InputErrorsByProps, RequiredRule],
  props: {
    value: {
      type: [String, Array]
    },
    hideDetails: {type: Boolean, default: false}
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
      IngredientProvider.fetchIngredients().then(r => {
        this.items = r.data.ingredientFetch
      }).catch(err => console.error(err))
          .finally(() => this.loading = false)
    }

  }
}
</script>

<style scoped>

</style>

