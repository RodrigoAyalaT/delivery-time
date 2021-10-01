<template>
  <v-row v-if="$store.getters.isSettingsReady" align="stretch" justify="center">

    <v-col cols="12" sm="6" md="8" class="px-6">
      <h3
          class="text-center"
          :class="{'text-h4': $vuetify.breakpoint.smAndUp}"
      >
        {{ $t('delivery.orderReview') }}
      </h3>
      <p
          class="text-center"
      >
        {{ $t('delivery.orderReviewDescription') }}
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
            <order-review-contact @edit="$emit('editContact')"/>
          </v-col>
          <v-col cols="12">
            <order-review-location @edit="$emit('editLocation')"/>
          </v-col>

          <v-col cols="12">
            <order-review-payment @edit="$emit('editPayment')"/>
          </v-col>

          <v-col cols="12">
            <order-review-items @edit="$emit('editProducts')"></order-review-items>
          </v-col>

          <v-col cols="12">
            <order-review-total></order-review-total>
          </v-col>

          <v-col cols="12" class="text-center mt-3">

            <order-confirmation></order-confirmation>
          </v-col>

        </v-row>
      </v-col>
    </template>
  </v-row>

</template>

<script>

import OrderReviewContact from "@/modules/delivery/components/OrderReviewContact";
import OrderReviewLocation from "@/modules/delivery/components/OrderReviewLocation";
import OrderReviewItems from "@/modules/delivery/components/OrderReviewItems";
import OrderReviewTotal from "@/modules/delivery/components/OrderReviewTotal";
import OrderReviewPayment from "@/modules/delivery/components/OrderReviewPayment";
import OrderConfirmation from "@/modules/delivery/components/OrderConfirmation/OrderConfirmation";

export default {
  name: "OrderReview",
  components: {
    OrderConfirmation,
    OrderReviewTotal,
    OrderReviewItems,
    OrderReviewLocation,
    OrderReviewContact,
    OrderReviewPayment,
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped>

</style>
