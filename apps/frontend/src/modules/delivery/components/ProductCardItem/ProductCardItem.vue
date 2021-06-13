<template>
  <v-card v-on:mouseover="elevation = 10" v-on:mouseleave="elevation = 2"  :elevation="elevation">
    <v-list-item class="px-1">
      <v-list-item-avatar class="my-0">
        <img :src="product.image"/>
      </v-list-item-avatar>

      <v-list-item-content class="py-0">
        <v-list-item-title v-html="product.name"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-chip class="primary onPrimary--text font-weight-bold">x{{ quantity }}</v-chip>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "ProductCardItem",
  props: {
    product: Object,
    quantity: Number,
    editQuantity: {type: Boolean, default: false}
  },
  data(){
    return {
      elevation: 2
    }
  }
}
</script>

<style scoped>

</style>
