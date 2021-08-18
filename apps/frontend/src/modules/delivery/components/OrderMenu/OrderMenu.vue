<template>
  <div>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="250"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small
               class="indigo--text"
               v-bind="attrs"
               v-on="on"
        >
          #{{ order.number }}
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>#{{ order.number }}
                <v-btn x-small icon @click="$emit('showOrder',order)">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-list-item-title>
              <v-list-item-subtitle>Cantidad total: {{ order.totalQuantity }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="menu=false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense v-for="category in getItemsCategories" :key="category.id" class="mb-0 pb-0">
          <span class="py-0 px-2">{{ category.name }}</span>
          <v-list-item v-for="item in getItemsByCategory(category)"
                       :key="item.product.id">
            <v-list-item-avatar height="30" width="30" class="my-0">
              <img :src="item.product.image"/>
            </v-list-item-avatar>
            <v-list-item-title class="subtitle-1">
              {{ item.product.name }}
            </v-list-item-title>
            <v-list-item-avatar height="30" width="30" class="my-0">
              <v-chip small class="primary onPrimary--text font-weight-bold">x{{ item.quantity }}</v-chip>
            </v-list-item-avatar>
            <v-list-item-action class="my-0">
              <v-checkbox
                  hide-details

                  color="purple"
              ></v-checkbox>
            </v-list-item-action>
          </v-list-item>
        </v-list>

      </v-card>
    </v-menu>
  </div>
</template>

<script>
import CategoryMixin from "@/modules/delivery/mixins/CategoryMixin";

export default {
  name: "OrderMenu",
  props: {
    order: {type: Object},
    items: {type: Array}
  },
  mixins: [CategoryMixin],
  data() {
    return {
      menu: false,
    }
  }
}
</script>

<style scoped>

</style>
