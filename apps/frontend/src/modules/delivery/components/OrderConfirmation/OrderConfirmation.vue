<template>
  <v-row v-if="$store.getters.isSettingsReady" align="stretch" justify="center">

    <v-col cols="12" sm="6" md="8" class="px-6">
      <h3
          class="text-center"
          :class="{'text-h4': $vuetify.breakpoint.smAndUp}"
      >
        {{ $t('delivery.checkAndConfirm') }}
      </h3>
      <p
          class="text-center"
      >
        {{ $t('delivery.checkAndConfirmDescription') }}
      </p>
    </v-col>

    <template v-if="!$store.getters.orderIsReady">
      <v-col cols="12" sm="6" md="8">
        <v-alert
            v-for="(message,i) in $store.getters.orderConfirmationErrorMessage"
            :key="i"
            type="warning"
        >
          {{ $t(message) }}
        </v-alert>
      </v-col>
    </template>

    <template v-else>

      <v-col cols="12" sm="6" md="8">
        <v-row dense no-gutters>
          <v-col cols="12">
            <order-confirmation-contact @edit="$emit('editContact')"/>
          </v-col>
          <v-col cols="12">
            <order-confirmation-location @edit="$emit('editLocation')"/>
          </v-col>

          <v-col cols="12">
            <order-confirmation-items @edit="$emit('editProducts')"></order-confirmation-items>
          </v-col>

          <v-col cols="12">
            <order-confirmation-total></order-confirmation-total>
          </v-col>

          <v-col cols="12" class="text-center mt-3">

            <!--CREATE ORDER-->
            <v-btn
                @click="$store.dispatch('createOrder')"
                :disabled="!$store.getters.orderIsReady"
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
    </template>
  </v-row>

</template>

<script>

import OrderConfirmationContact from "@/modules/delivery/components/OrderConfirmationContact/OrderConfirmationContact";
import OrderConfirmationLocation
  from "@/modules/delivery/components/OrderConfirmationLocation/OrderConfirmationLocation";
import OrderConfirmationItems from "@/modules/delivery/components/OrderConfirmationItems/OrderConfirmationItems";
import OrderConfirmationTotal from "@/modules/delivery/components/OrderConfirmationTotal/OrderConfirmationTotal";

export default {
  name: "OrderConfirmation",
  components: {OrderConfirmationTotal, OrderConfirmationItems, OrderConfirmationLocation, OrderConfirmationContact},
}
</script>

<style scoped>

</style>
