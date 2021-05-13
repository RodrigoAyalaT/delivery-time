<template>
  <v-container fill-height>
    <v-btn :style="{'z-index':5}"
           color="primary" fixed bottom right
           @click="showOrder=!showOrder"
           class="mt-6"
           fab large
    >
      <v-icon>shopping_cart</v-icon>
      {{ getTotalItems }}
    </v-btn>
    <v-row>

      <v-col cols="12" sm="8" md="9">
        <v-row>


          <v-col v-for="product in products"
                 :key="product.id"
                 cols="6" sm="6" md="3"
                 class="pt-0"
          >

            <v-card :elevation="10">
              <v-card-title>
                {{ product.name }}
                <v-spacer></v-spacer>
                <v-chip>${{ product.price }}</v-chip>
              </v-card-title>
              <v-img height="150" :src="product.image"></v-img>
              <!-- <v-card-text>
                 <p>{{ product.description }}</p>
               </v-card-text>-->
              <v-card-actions>
                <v-btn dark fab small color="primary" @click="removeProduct(product)">
                  <v-icon>remove</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                {{ getQuantity(product) }}
                <v-spacer></v-spacer>
                <v-btn dark fab small color="primary" @click="addProduct(product)">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-col>
        </v-row>
      </v-col>

      <v-col v-if="$vuetify.breakpoint.smAndUp" cols="12" sm="4" md="3">
        <!-- <v-content :style="{position:'fixed'}">-->
        <v-card flat fill-height>
          <v-card-title>Orden</v-card-title>
          <v-card-text class="pa-0">
            <v-list class="px-0">
              <v-list-item class="px-1" v-for="item in order.items" :key="item.product.id">
                <v-list-item-avatar>
                  <img :src="item.product.image"/>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.product.name"></v-list-item-title>
                  <v-list-item-subtitle>x{{ item.quantity }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn small icon @click="addProduct(item.product)">
                    <v-icon>add</v-icon>
                  </v-btn>
                  <v-btn small icon @click="removeProduct(item.product)">
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

          </v-card-text>
        </v-card>
        <!-- </v-content>-->

      </v-col>


    </v-row>

    <v-navigation-drawer temporary v-model="showOrder" right fixed>

      <v-card flat>
        <v-card-title>Orden</v-card-title>
        <v-card-text class="pa-0">
          <v-list class="px-0">
            <v-list-item class="px-1" v-for="item in order.items" :key="item.product.id">
              <v-list-item-avatar>
                <img :src="item.product.image"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.product.name"></v-list-item-title>
                <v-list-item-subtitle>x{{ item.quantity }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn small icon @click="addProduct(item.product)">
                  <v-icon>add</v-icon>
                </v-btn>
                <v-btn small icon @click="removeProduct(item.product)">
                  <v-icon>remove</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

        </v-card-text>
      </v-card>
    </v-navigation-drawer>

  </v-container>
</template>

<script>
import ProductProvider from "@/modules/delivery/providers/ProductProvider";

export default {
  name: "OrderSidePage",
  data() {
    return {
      showOrder: false,
      products: [],
      order: {
        name: null,
        email: null,
        phone: null,
        address: null,
        items: []
      }
    }
  },
  mounted() {
    this.fetchProducts()
  },
  computed: {
    getQuantity() {
      return (product) => {
        let item = this.order.items.find(p => p.product.id === product.id)
        if (item) {
          return item.quantity
        }
        return 0
      }
    },
    getTotalItems() {
      return this.order.items.reduce((a, v) => a + v.quantity, 0)
    }
  },
  methods: {
    addProduct(productToAdd) {
      // { product: {id,name, price}, quantity: 1}

      let item = this.order.items.find(p => p.product.id === productToAdd.id)
      if (item) {
        item.quantity++
      } else {
        this.order.items.push({
          product: productToAdd,
          quantity: 1
        })
      }
    },
    removeProduct(productToRemove) {
      let item = this.order.items.find(p => p.product.id === productToRemove.id)
      if (item && item.quantity > 0) {
        item.quantity--
      }
    },
    fetchProducts() {
      ProductProvider.fetchProducts().then(r => {
        this.products = r.data.productFetch
      })
    }
  }
}
</script>

<style scoped>
.scroll {
  overflow-y: scroll
}
</style>
