<template>
  <v-row>
      <v-col cols="12" sm="6" class="pt-0">
        <v-text-field
            prepend-icon="takeout_dining"
            name="name"
            v-model="filters.name"
            :label="$t('delivery.product.labels.name')"
            :placeholder="$t('delivery.product.labels.name')"
            color="secondary"
            hide-details
        ></v-text-field>
      </v-col>

    <v-col cols="12" sm="6" class="pt-0">
      <ingredient-combobox  hide-details v-model="filters.ingredients"/>
    </v-col>

  </v-row>
</template>

<script>
import IngredientCombobox from "@/modules/delivery/components/IngredientCombobox/IngredientCombobox";

export default {
  name: "ProductFilters",
  props: {
    value: Object
  },
  computed: {
    filters: {
      get(){
        return this.value
      },
      set(val){
        this.$emit('input',val)
      }
    }
  },
  watch:{
    filters:{
      handler(val){
        this.$emit('input',val)
      },
      deep: true
    }
  },
  components: {IngredientCombobox}
}
</script>

<style scoped>

</style>
