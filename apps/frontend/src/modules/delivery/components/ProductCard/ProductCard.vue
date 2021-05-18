<template>
  <v-card :elevation="10">
    <v-card-title>
      {{ product.name }}
      <v-spacer></v-spacer>
      <v-chip class="primary--text">${{ product.price }}</v-chip>
    </v-card-title>
    <v-img height="150" :src="product.image"></v-img>

    <v-card-actions>
      <v-btn dark fab small color="primary" @click="$emit('removeProduct',product)">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      {{ quantity }}
      <v-spacer></v-spacer>
      <v-btn dark fab small color="primary" @click="$emit('addProduct',product)">
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
  }
}
</script>

<style scoped>

</style>
