<template>
  <v-card flat>
      <h6 class="text-h6">Mi pedido</h6>
      <v-divider class="mb-3"></v-divider>

    <v-card-text v-if="items.length == 0" class="pa-0">
      Tu pedido está vacio.
    </v-card-text>

    <v-card-text class="pa-0">
      <v-list class="px-0">
        <v-list-item class="px-1" v-for="item in items" :key="item.product.id">
          <v-list-item-avatar class="my-0">
            <img :src="item.product.image"/>
          </v-list-item-avatar>
          <v-list-item-content class="py-0">
            <v-list-item-title v-html="item.product.name"></v-list-item-title>
            <v-list-item-subtitle>x{{ item.quantity }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="my-0">
            x{{ item.quantity }}
          </v-list-item-action>
          <v-list-item-action class="my-0">
            <v-btn small icon @click="$emit('addProduct',item.product)">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn small icon @click="$emit('removeProduct',item.product)">
              <v-icon>remove</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

    </v-card-text>

    <v-card-text v-if="quantityTotal" class="py-0 text-right">
      <v-list class="py-0">
        <v-list-item class="my-0">
          <v-list-item-subtitle>Cantidad total:</v-list-item-subtitle>

          <v-list-item-title>{{ quantityTotal }}</v-list-item-title>
        </v-list-item>

        <v-list-item class="my-0">
          <v-list-item-subtitle>Monto total:</v-list-item-subtitle>
          <v-list-item-title>${{ amountTotal }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions v-if="showActions">
      <v-spacer></v-spacer>
      <v-btn text color="grey" @click="showCancel=true">Cancelar</v-btn>
      <v-btn class="primary">Pedir</v-btn>
    </v-card-actions>
    <confirm-dialog
        v-model="showCancel"
        @confirmed="confirmed"
        title="Cancelar Orden"
        description="Esta seguro de cancelar su orden?"
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
    items: {type: Array},
    quantityTotal: {type: Number, default: 0},
    amountTotal: {type: Number, default: 0},
    showActions: {type: Boolean, default: false}
  },
  methods: {
    confirmed() {
      this.$emit('clearOrder')
    }
  }
}
</script>

<style scoped>

</style>
