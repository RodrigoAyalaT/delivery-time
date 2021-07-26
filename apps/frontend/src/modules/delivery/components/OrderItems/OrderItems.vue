<template>
  <div >
    <v-row dense v-for="category in getItemsCategories"  :key="category.id">
      <h6 class="subtitle-1">{{ category.name }}</h6>
      <v-col v-for="item in getItemsByCategory(category)"
             :key="item.product.id"
             cols="12"
      >
        <product-card-item
            :product="item.product"
            :quantity="item.quantity"
        ></product-card-item>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import CategoryMixin from "@/modules/delivery/mixins/CategoryMixin";
import ProductCardItem from "@/modules/delivery/components/ProductCardItem/ProductCardItem";

export default {
  name: "OrderItems",
  components: {ProductCardItem},
  props: {
    items: {type: Array}
  },
  mixins: [CategoryMixin]
}
</script>

<style scoped>

</style>
