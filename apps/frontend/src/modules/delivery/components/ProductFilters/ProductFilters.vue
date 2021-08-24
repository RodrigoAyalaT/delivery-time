<template>
  <v-row dense>
    <v-col cols="12" :sm="vertical?12:4" class="pt-0">
      <v-menu
      >
        <template v-slot:activator="{ on }">
          <v-text-field
              clearable
              @click:clear="onClear"
              prepend-inner-icon="search"
              append-outer-icon="inventory"
              name="name"
              v-model="filters.name"
              :label="$t('delivery.product.search')"
              :placeholder="$t('delivery.product.search')"
              color="secondary"
              solo
              hide-details
              @click:append-outer="on.click"
              @keyup.enter="$emit('input',filters)"
          ></v-text-field>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="font-weight-bold">{{ $t('delivery.product.labels.ingredients') }}
            </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
              v-for="ingredient in getIngredients" :key="ingredient.id"
              @click="addIngredient(ingredient)"
          >
            <v-list-item-title>{{ ingredient.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>

    <v-col cols="12" class="py-0">
      <v-chip
          v-for="(ingredientId,i) in filters.ingredients" :key="i"
          close
          @click:close="removeIngredient(i)"
      >
        {{ getIngredientById(ingredientId).name }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>

import IngredientProvider from "@/modules/delivery/providers/IngredientProvider";

export default {
  name: "ProductFilters",
  props: {
    value: {type: Object},
    vertical: {type: Boolean, default: false}
  },
  data() {
    return {
      search: '',
      fixed: false,
      showFiltersMenu: false,
      ingredients: []
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
    },
    getIngredients() {
      return this.ingredients.filter(i => !this.filters.ingredients.includes(i.id))
    },
    getIngredientById(){
      return id => this.ingredients.find(i => i.id === id )
    }
  },
  mounted() {
    this.fetchIngredients()
  },
  methods: {
    onClear(){
      setTimeout(()=>this.$emit('input', this.filters),10)
    },
    removeIngredient(i) {
      this.filters.ingredients.splice(i, 1)
      this.$emit('input', this.filters)
    },
    addIngredient(ingredient) {
      this.filters.ingredients.push(ingredient.id)
      this.$emit('input', this.filters)
    },
    fetchIngredients() {
      this.loading = true
      IngredientProvider.fetchIngredients()
          .then(r => {
            this.ingredients = r.data.ingredientFetch
          })
          .catch(err => console.error(err))
          .finally(() => this.loading = false)
    }
  }
}
</script>

<style scoped>

</style>
