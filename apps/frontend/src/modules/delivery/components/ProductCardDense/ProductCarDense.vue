<template>
  <v-card
      class="py-0 pl-2"
  >
    <div class="d-flex flex-no-wrap justify-space-between align-center">

      <div>
        <v-avatar tile size="50px">
          <v-img :src="product.image"></v-img>
        </v-avatar>
      </div>

      <div class="title text-left flex-grow-1 pl-3">
          <v-clamp autoresize :max-lines="1">
          {{ product.name.charAt(0).toUpperCase() + product.name.toLowerCase().substring(1) }}
          </v-clamp>
      </div>

      <div>
        <v-card-actions>
          <v-select
              dense
              :items="getQuantityItems"
              solo single-line
              hide-details
              class="centered-input"
              v-model="localQuantity"
              :style="{width: '75px'}"
          ></v-select>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script>
import VClamp from 'vue-clamp'

export default {
  name: "ProductCardDense",
  components: {
    VClamp
  },
  props: {
    product: Object,
    quantity: Number,
    editQuantity: {type: Boolean, default: false},
  },
  computed:{
    getQuantityItems(){
      return Array.from({length:36},(v,k)=>k+1)
    },
    localQuantity:{
      get(){
        return this.quantity
      },
      set(val){
        this.$store.commit('changeOrderItemQuantity',{product: this.product,quantity: val})
      }
    }
  },
  data() {
    return {
      elevation: 2
    }
  },
  methods:{
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
.centered-input >>> input {
  text-align: center
}
</style>
