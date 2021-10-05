<template>
  <div>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="250"

    >
      <template v-slot:activator="{ on, attrs }">
        <div class="flex align-center">
          <v-btn text small
                 class="indigo--text"
                 v-bind="attrs"
                 v-on="on"
          >
            #{{ order.number }}
          </v-btn>
          <v-btn
              v-if="order.payment.receiptFile"
              icon x-small class="align-self-center"
              :href="order.payment.receiptFile"
              target="_blank"
          >
            <v-icon>attachment</v-icon>
          </v-btn>
        </div>
      </template>

      <v-card class="pb-1">
        <div class="pa-1">
          <v-btn text small class="primary--text onPrimary" @click="$emit('showOrder',order)">#{{
              order.number
            }}
          </v-btn>
          <v-btn class="float-right" icon x-small @click="menu=false">
            <v-icon>close</v-icon>
          </v-btn>
        </div>

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

                  color="green"
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
