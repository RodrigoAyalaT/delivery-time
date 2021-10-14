<template>
  <v-card

      v-on:mouseover="elevation = 10"
      v-on:mouseleave="elevation = 2"
      :elevation="elevation"
      :height="getHeight"
  >
    <v-row no-gutters>
      <v-col cols="12" :md="getMdPicture">
        <v-img
            :style="{backgroundColor: getBackgroundColor, border: getBorder}"
            eager
            :contain="getSize === 'MEDIUM'"
            height="145" :src="product.image"
        ></v-img>

      </v-col>

      <v-col cols="12" :md="getMdText">
        <v-card-title class="pt-1">
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
      </v-col>
    </v-row>

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
    editQuantity: {type: Boolean, default: false},
  },
  data() {
    return {
      elevation: 2
    }
  },
  computed: {
    getSize() {
      switch (this.$store.getters.getGalleryView) {
        case 12:
          return 'LARGE'
        case 6:
          return 'MEDIUM'
        case 4:
          return 'SMALL'
        default:
          return 'SMALL'
      }
    },
    getHeight() {
      switch (this.getSize) {
        case 'LARGE':
          return 145
        default:
          return 280
      }
    },
    getMdPicture() {
      switch (this.getSize) {
        case 'LARGE':
          return 4
        default:
          return 12
      }
    },
    getMdText() {
      switch (this.getSize) {
        case 'LARGE':
          return 8
        default:
          return 12
      }
    },
    getBackgroundColor() {
      return this.product.category.backgroundColor ? this.product.category.backgroundColor : null
    },
    getBorder() {
      return this.product.category.borderColor ? 'solid 2px ' + this.product.category.borderColor : null
    },
    getFontColor() {
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
