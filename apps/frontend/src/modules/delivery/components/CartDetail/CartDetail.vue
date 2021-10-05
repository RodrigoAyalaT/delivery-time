<template>
  <v-card :flat="flat">
    <v-card-title>
      <h6 class="text-h6 grey--text text--darken-2">
        {{ $t('delivery.myOrder') }}
      </h6>
    </v-card-title>

    <v-divider class="mb-3"></v-divider>

    <v-card-text v-if="items.length == 0" >
      {{ $t('delivery.emptyOrder') }}
    </v-card-text>

    <v-card-text class="pa-2">
      <template v-for="category in getCategories">
        <div v-if="hasCategoryItems(category)" :key="category.id">
          <h6 class="subtitle-1">{{ category.name }}</h6>
          <v-list class="px-0">


            <template v-for="(item,index) in getItemsByCategory(category)">
              <v-list-item ripple class="px-1" :key="item.product.id">
             <!--   <v-list-item-avatar class="my-0">
                  <img :src="item.product.image"/>
                </v-list-item-avatar>-->
                <v-list-item-content class="py-0">
                  <v-list-item-title >
                    {{ item.product.name.charAt(0).toUpperCase() + item.product.name.toLowerCase().substring(1) }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="ma-0">
                  <v-chip class="grey--text text--darken-2 grey lighten-3">{{ item.quantity }}</v-chip>
                </v-list-item-action>
                <v-list-item-action class="ma-0">
                  <v-btn small icon @click="addProduct(item.product)">
                    <v-icon>add</v-icon>
                  </v-btn>
                  <v-btn small icon @click="removeProduct(item.product)">
                    <v-icon>remove</v-icon>
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
      <v-row>
    <!--    <v-col cols="8">
          <h6 class="text-h6">
            {{ $t('delivery.cart.quantity') }}:
          </h6>
        </v-col>
        <v-col cols="4">
          <h6 class="text-h6 text-center green&#45;&#45;text text&#45;&#45;darken-2">{{ quantityTotal }}</h6>
        </v-col>
-->
        <v-col cols="12" >
          <h6 class="text-h5">
            {{ $t('delivery.cart.total') }}: ${{ amountTotal }}
          </h6>
        </v-col>


      </v-row>

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
          :disabled="quantityTotal?false:true"
          @click="next"
      >
        {{ $t('common.next') }}
      </v-btn>
    </v-card-actions>
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

export default {
  name: "CartDetail",
  components: {ConfirmDialog},
  data() {
    return {
      showCancel: false
    }
  },
  props: {
    flat: {type: Boolean, default: false},
    items: {type: Array},
    quantityTotal: {type: Number, default: 0},
    amountTotal: {type: Number, default: 0},
    showActions: {type: Boolean, default: false}
  },
  computed: {
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
