<template>
  <v-row v-if="$store.getters.isSettingsReady" align="stretch" justify="center">

    <v-col cols="12" sm="6" md="8">
      <h3 class="text-h4 text-center">{{ $t('delivery.checkAndConfirm') }}</h3>
    </v-col>

    <v-col cols="12" sm="6" md="8">
      <v-row dense>
        <v-col cols="12" md="6">
          <show-order-contact @edit="$emit('editContact')"></show-order-contact>
        </v-col>
        <v-col cols="12" md="6">
          <show-order-location @edit="$emit('editLocation')"></show-order-location>
        </v-col>

      </v-row>
    </v-col>

    <v-col cols="12" sm="12" md="8">

      <show-order-items @edit="$emit('editProducts')"></show-order-items>

    </v-col>

    <v-col cols="12" sm="6" md="8">
      <show-order-total></show-order-total>
      <v-row no-gutters>

        <v-col>
          {{ $store.getters.getOrderError }}
          {{ $store.getters.getOrderLoading }}
        </v-col>

        <v-col cols="12" class="text-center">

          <!--CREATE ORDER-->
          <v-btn
              @click="$store.dispatch('createOrder')"
              :disabled="!orderIsReady"
              color="green white--text"
              x-large
          >
            <v-icon large left>done</v-icon>
            <span class="font-weight-bold"
            >{{ $t('common.confirm') }} PEDIDO</span>
          </v-btn>

        </v-col>
      </v-row>
    </v-col>


  </v-row>
</template>

<script>
import ShowOrderContact from "@/modules/delivery/components/ShowOrderContact/ShowOrderContact";
import ShowOrderLocation from "@/modules/delivery/components/ShowOrderLocation/ShowOrderLocation";
import ShowOrderTotal from "@/modules/delivery/components/ShowOrderTotal/ShowOrderTotal";
import ShowOrderItems from "@/modules/delivery/components/ShowOrderItems/ShowOrderItems";

export default {
  name: "ShowOrder",
  components: {ShowOrderItems, ShowOrderTotal, ShowOrderLocation, ShowOrderContact},
  computed: {
    orderIsReady() {
      //NO ITEMS
      if (this.$store.getters.getQuantityTotal == 0) {
        return false
      }
      //NO DELIVERY COMPLETE
      if (
          !this.$store.getters.getOrderDelivery.mode ||
          !this.$store.getters.getOrderDelivery.timeMode ||
          !this.$store.getters.getOrderDelivery.time
      ) {
        return false
      }

      return true
    }
  }
  ,

}
</script>

<style scoped>

</style>
