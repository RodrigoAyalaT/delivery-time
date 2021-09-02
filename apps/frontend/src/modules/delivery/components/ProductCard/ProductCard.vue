<template>
  <v-card
      v-on:mouseover="elevation = 10"
      v-on:mouseleave="elevation = 2"
      :elevation="elevation"
      height="255"
  >
    <v-img eager height="120" :src="product.image"></v-img>

    <v-card-title  class="pt-1">
      <v-clamp autoresize :max-lines="1">
        {{ product.name.charAt(0).toUpperCase() + product.name.toLowerCase().substring(1) }}
      </v-clamp>
    </v-card-title>
    <v-card-subtitle style="height: 60px" >
      <v-clamp autoresize :max-lines="2">
      {{ product.description }}
      </v-clamp>
    </v-card-subtitle>

    <v-card-actions class="pt-0">
      <v-chip class="primary--text">${{ product.price }}</v-chip>
      <v-spacer></v-spacer>
      <!--REMOVE-->
      <v-btn v-if="editQuantity && quantity > 0"
             fab x-small outlined color="primary"
             @click="$emit('removeProduct',product)"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <!--SHOW-->
      <span v-if="quantity > 0" class="px-3">x{{ quantity }}</span>
      <!--ADD-->
      <v-btn v-if="editQuantity"
             fab x-small
             color="primary"
             @click="$emit('addProduct',product)"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import VClamp from 'vue-clamp'

export default {
  name: "ProductCard",
  components: {
    VClamp
  },
  props: {
    product: Object,
    quantity: Number,
    editQuantity: {type: Boolean, default: false}
  },
  data() {
    return {
      elevation: 2
    }
  }
}
</script>

<style scoped>

</style>
