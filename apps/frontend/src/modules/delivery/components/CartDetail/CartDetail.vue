<template>
  <v-card :flat="flat">
    <v-card-title class="py-0">
      <h6 class="text-h6 grey--text text--darken-2 py-0">
        {{ $t('delivery.myOrder') }}
      </h6>
    </v-card-title>

    <v-divider class="mb-3"></v-divider>

    <v-card-text v-if="items.length == 0">
      {{ $t('delivery.emptyOrder') }}
    </v-card-text>

    <v-card-text class="pa-1">
      <template v-for="category in getCategories">
        <div v-if="hasCategoryItems(category)" :key="category.id">
          <h6 class="subtitle-1">{{ category.name }}</h6>
          <v-list class="px-0 pt-0" dense>
            <template v-for="(item,index) in getItemsByCategory(category)">
              <v-list-item ripple class="px-1" :key="item.product.id">
                <v-list-item-avatar class="my-0 ml-0 mr-1">
                  <img :style="{backgroundColor: getBackgroundColor(item.product)}" :src="item.product.image"/>
                </v-list-item-avatar>
                <v-list-item-content class="py-0">
                  <v-list-item-title>
                    {{ item.product.name.charAt(0).toUpperCase() + item.product.name.toLowerCase().substring(1) }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    ${{ item.product.price }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="ma-0">
                  <v-chip class="grey--text text--darken-2 grey lighten-3">{{ item.quantity }}</v-chip>
                </v-list-item-action>
                <v-list-item-action class="ma-0">
                  <v-btn small icon @click="addProduct(item.product)">
                    <v-icon>add</v-icon>
                  </v-btn>
                  <v-btn small icon @click="removeProduct(item.product)">
                    <v-icon>{{ item.quantity === 1 ? 'delete' : 'remove' }}</v-icon>
                  </v-btn>
                </v-list-item-action>

              </v-list-item>
              <v-divider :key="index"></v-divider>
            </template>
          </v-list>
        </div>
      </template>
    </v-card-text>

    <v-card-text v-if="quantityTotal" class="py-1 text-right">
      <cart-total
          :amount-products="amountProducts"
          :delivery-cost="deliveryCost"
          :amount-total="amountTotal"
      />

    </v-card-text>
    <v-card-actions v-if="showActions">
      <v-btn
          text color="red"
          v-if="quantityTotal > 0 ? true : false"
          @click="showCancel=true"
      >
        VACIAR
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          text color="grey"
          @click="$emit('close')"
      >
        {{ $t('common.close') }}
      </v-btn>
      <v-btn
          class="primary"
          :disabled="quantityTotal < getMinimunQuantity"
          @click="next"
      >
        {{ $t('common.next') }}
      </v-btn>
    </v-card-actions>

    <v-card-text v-if="showMinimun && quantityTotal < getMinimunQuantity">
      <v-alert type="warning"> {{ $t('delivery.empty.minimunQuantity', {quantity: getMinimunQuantity }) }}</v-alert>
    </v-card-text>

    <confirm-dialog
        v-model="showCancel"
        @confirmed="confirmed"
        title="Vaciar Orden"
        description="Esta seguro de vaciar su orden?"
    >

    </confirm-dialog>
  </v-card>
</template>

<script>
import {ConfirmDialog} from '@dracul/common-frontend'
import CartTotal from "@/modules/delivery/components/CartTotal/CartTotal";

export default {
  name: "CartDetail",
  components: {CartTotal, ConfirmDialog},
  data() {
    return {
      showCancel: false
    }
  },
  props: {
    flat: {type: Boolean, default: false},
    items: {type: Array},
    quantityTotal: {type: Number, default: 0},
    amountProducts: {type: Number, default: 0},
    deliveryCost: {type: Number, default: null},
    amountTotal: {type: Number, default: 0},
    showActions: {type: Boolean, default: false},
    showMinimun: {type: Boolean, default: false},
  },
  computed: {
    getMinimunQuantity(){
      return this.$store.getters.getMinimunQuantity
    },
    getBackgroundColor() {
      return product => {
        return product.category.backgroundColor ? product.category.backgroundColor : null

      }
    },
    getCategories() {
      return this.$store.getters.getCategories
    },
    getItemsByCategory() {
      return category => {
        return this.items.filter(i => i.product.category.id === category.id)
      }
    },
    hasCategoryItems() {
      return category => {
        return this.items.some(i => i.product.category.id === category.id)
      }
    }
  },
  methods: {
    confirmed() {
      this.$store.dispatch('clearOrderItems')
    },
    next() {
      this.$emit('next')
    },
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
