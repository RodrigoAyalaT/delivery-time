<template>
  <v-card v-on:mouseover="elevation = 10" v-on:mouseleave="elevation = 2"  :elevation="elevation">
    <v-img height="120" :src="product.image"></v-img>

    <v-card-title class="pt-1">
      {{ product.name }}
    </v-card-title>
    <v-card-subtitle style="height: 30px" class="text-truncate">{{ product.description }}</v-card-subtitle>

    <v-card-actions class="pt-0">
      <v-chip class="primary--text">${{ product.price }}</v-chip>

      <v-spacer></v-spacer>
      <v-btn v-if="quantity > 0"  fab x-small outlined color="primary" @click="$emit('removeProduct',product)">
        <v-icon>remove</v-icon>
      </v-btn>
      <span v-if="quantity > 0" class="px-3">x{{ quantity }}</span>
      <v-btn  fab x-small  color="primary" @click="$emit('addProduct',product)">
        <v-icon>add</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object,
    quantity: Number
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
