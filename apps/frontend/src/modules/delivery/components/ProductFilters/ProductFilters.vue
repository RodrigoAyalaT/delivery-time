<template>
  <v-card flat class="mb-1">
      <h6 class="text-h6">Filtros</h6>
      <v-divider class="mb-3"></v-divider>

    <v-row>
      <v-col cols="12" :sm="vertical?12:4" class="pt-0">
        <v-text-field
            prepend-inner-icon="takeout_dining"
            name="name"
            v-model="filters.name"
            :label="$t('delivery.product.labels.name')"
            :placeholder="$t('delivery.product.labels.name')"
            color="secondary"
            solo
            hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="12" :sm="vertical?12:4" class="pt-0">
        <product-category-combobox
            solo
            hide-details
            clearable
            :isRequired="false"
            v-model="filters.category"
        />
      </v-col>

      <v-col cols="12" :sm="vertical?12:4" class="pt-0">
        <ingredient-combobox
            solo
            hide-details
            clearable
            v-model="filters.ingredients"
        />
      </v-col>



    </v-row>
  </v-card>

</template>

<script>
import IngredientCombobox from "@/modules/delivery/components/IngredientCombobox/IngredientCombobox";
import ProductCategoryCombobox from "@/modules/delivery/components/ProductCategoryCombobox/ProductCategoryCombobox";

export default {
  name: "ProductFilters",
  components: {ProductCategoryCombobox, IngredientCombobox},
  props: {
    value: Object,
    vertical: {type: Boolean, default: false}
  },
  data() {
    return {
      fixed: false
    }
  },
  computed: {
    filters: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    filters: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
