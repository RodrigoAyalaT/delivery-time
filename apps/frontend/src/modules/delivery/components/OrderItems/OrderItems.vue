<template>
    <v-row dense >
      <v-col
          v-for="category in getItemsCategories"
          :key="category.id"
          cols="12" md="6"
      >
        <v-list >
          <v-list-item>
            <v-list-item-title class="font-weight-bold">
              {{ category.name }}
            </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item v-for="item in getItemsByCategory(category)"
                       :key="item.product.id">
            <v-list-item-avatar height="30" width="30">
              <img :src="item.product.image"/>
            </v-list-item-avatar>
            <v-list-item-title>
              {{ item.product.name }}
            </v-list-item-title>

            <v-list-item-avatar>
              <v-chip class="primary onPrimary--text font-weight-bold">
                <span>x{{ item.quantity }}</span>
              </v-chip>
            </v-list-item-avatar>

          </v-list-item>

        </v-list>
      </v-col>
    </v-row>
</template>

<script>
import CategoryMixin from "@/modules/delivery/mixins/CategoryMixin";

export default {
  name: "OrderItems",
  props: {
    items: {type: Array}
  },
  mixins: [CategoryMixin]
}
</script>

<style scoped>

</style>
