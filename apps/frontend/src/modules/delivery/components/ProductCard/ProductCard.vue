<template>
  <v-card

      v-on:mouseover="elevation = 10"
      v-on:mouseleave="elevation = 2"
      :elevation="elevation"
      height="280"
  >

    <v-img
        :style="{backgroundColor: getBackgroundColor, border: getBorder}"
         eager
        height="145" :src="product.image"
    ></v-img>

    <v-card-title class="pt-1" >
      <v-clamp autoresize :max-lines="1" :style="{color: getFontColor}">
        {{ product.name.charAt(0).toUpperCase() + product.name.toLowerCase().substring(1) }}
      </v-clamp>
    </v-card-title>
    <v-card-subtitle style="height: 60px">
      <v-clamp autoresize :max-lines="2">
        {{ product.description }}
      </v-clamp>
    </v-card-subtitle>

    <v-card-actions class="pt-0">
      <v-chip :style="{color:getFontColor}">${{ product.price }}</v-chip>
      <v-spacer></v-spacer>
      <!--REMOVE-->
      <v-btn v-if="editQuantity && quantity > 0"
             fab x-small outlined
             color="red"
             @click="removeProduct(product)"
      >
        <v-icon>{{ quantity === 1 ? 'delete' : 'remove' }}</v-icon>
      </v-btn>
      <!--SHOW-->
      <span v-if="quantity > 0" class="px-3">x{{ quantity }}</span>
      <!--ADD-->
      <v-btn v-if="editQuantity"
             fab x-small
             :color="getFontColor" dark
             @click="addProduct(product)"
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
  },
  computed: {
    getBackgroundColor() {
      return this.product.category.backgroundColor ? this.product.category.backgroundColor : null
    },
    getBorder(){
      return this.product.category.borderColor ? 'solid 2px ' + this.product.category.borderColor : null
    },
    getFontColor(){
      return this.product.category.fontColor ? this.product.category.fontColor : null
    }
  },
  methods: {
    addProduct(product) {
      this.$store.commit('addOrderItem', product)
    },
    removeProduct(product) {
      this.$store.commit('removeOrderItem', product)
    },
  }
}
</script>

<style scoped>

</style>
