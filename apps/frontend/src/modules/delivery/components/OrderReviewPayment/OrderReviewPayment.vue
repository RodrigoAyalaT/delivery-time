<template>
  <card-edit @edit="$emit('edit')">
    <v-card-title>
      {{$t('delivery.payment.title')}}
    </v-card-title>
    <v-row dense>

      <v-col cols="12"  >
        <show-field
            :value="$t('delivery.payment.method.'+$store.state.delivery.order.payment.method)"
            :label="$t('delivery.order.labels.paymentMethod')"
            icon="badge"
        />
      </v-col>

    </v-row>

<v-divider></v-divider>


  </card-edit>
</template>

<script>
import {ShowField} from '@dracul/common-frontend'
import CardEdit from "@/modules/delivery/components/CardEdit/CardEdit";

export default {
  name: "OrderReviewPayment",
  components: {CardEdit, ShowField},
}
</script>

<style scoped>

</style>
