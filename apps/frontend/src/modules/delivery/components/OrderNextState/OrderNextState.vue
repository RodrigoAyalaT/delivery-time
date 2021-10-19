<template>

  <v-row align="center">

    <template v-if="order.state === 'READY' && order.delivery.mode === 'DELIVERY'">
      <v-col class="flex-grow-1">
        <user-combobox
            v-model="user"
            role-name="repartidor"
            hide-details
            dense
        ></user-combobox>
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-1">
        <v-btn
            v-if="user"
            color="indigo" dark
            fab x-small
            @click="assignAndNext"
            :loading="loading"

        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
      </v-col>
    </template>

    <template v-else-if="(order.state === 'ON_THE_WAY' || order.state === 'DELIVERED') && order.delivery.mode === 'DELIVERY'">
      <v-col class="flex-grow-1">
        {{ (order.deliveryUser && order.deliveryUser.username) ? order.deliveryUser.username : ''}}
      </v-col>
      <v-col v-if="order.state != 'DELIVERED'" class="flex-grow-0 flex-shrink-1">
        <v-btn
            color="indigo" dark
            fab x-small
            @click="next"
            :loading="loading"
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
      </v-col>
    </template>

    <template v-else-if="order.state != 'DELIVERED'">
      <v-col class="flex-grow-1">
        <v-btn
            color="indigo" dark
             x-small fab
            @click="next"
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
      </v-col>
    </template>

  </v-row>

</template>

<script>
import OrderProvider from "@/modules/delivery/providers/OrderProvider";
import {UserCombobox} from "@dracul/user-frontend";

export default {
  name: "OrderNextState",
  props: {
    order: {type: Object},
  },
  components: {UserCombobox},
  data() {
    return {
      user: null,
      loading: false
    }
  },
  methods: {
    assignAndNext() {
      this.loading = true
      OrderProvider.updateOrderDeliveryUser({orderId: this.order.id, userId: this.user})
          .then(() => {

            this.next()
          })
          .catch(e => {
            console.error(e)
            this.loading = false
          })
    },
    next() {
      this.$emit('next', this.order)
    }
  }
}
</script>

<style scoped>

</style>
