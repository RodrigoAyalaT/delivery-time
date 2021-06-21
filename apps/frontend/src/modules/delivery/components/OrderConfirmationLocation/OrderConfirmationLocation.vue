<template>
  <card-edit v-if="$store.getters.isSettingsReady" @edit="$emit('edit')">
    <v-card-title>
      {{ $t('delivery.mode.' + $store.state.delivery.order.delivery.mode) }}
    </v-card-title>

    <v-list >
      <v-row dense>
        <template v-if="$store.state.delivery.order.delivery.mode === 'TAKE_AWAY'">
          <v-col cols="12">
            <show-field
                :value="$store.getters.getSetting('ShopAddress').value"
                :label="$t('maps.location.labels.address')"
                icon="location_on"
            />
          </v-col>
        </template>

        <template v-if="$store.state.delivery.order.delivery.mode === 'DELIVERY'">
          <v-col cols="12" md="7">
            <show-field
                :value="$store.state.delivery.order.location.address"
                :label="$t('maps.location.labels.address')"
                icon="location_on"
            />
          </v-col>

          <v-col cols="12" md="5">
            <v-row no-gutters>
              <v-col cols="5">
                <show-field
                    :value="$store.state.delivery.order.location.floor"
                    :label="$t('maps.location.labels.floor')"
                    icon="apartment"
                />
              </v-col>
              <v-col cols="7">
                <show-field
                    :value="$store.state.delivery.order.location.apartment"
                    :label="$t('maps.location.labels.apartment')"
                    icon="meeting_room"
                />
              </v-col>

            </v-row>
          </v-col>

        </template>

      </v-row>


      <show-field
          :value="getTime"
          :label="$t('delivery.schedule')"
          icon="alarm"
      />

    </v-list>

  </card-edit>
</template>

<script>
import {ShowField} from '@dracul/common-frontend'
import CardEdit from "@/modules/delivery/components/CardEdit/CardEdit";
import {Dayjs} from "@dracul/dayjs-frontend"

export default {
  name: "OrderConfirmationLocation",
  components: {CardEdit, ShowField},
  computed: {
    getDeliveryIntervalTime() {
      return this.$store.getters.getSetting('IntervalDeliveryTime').value
    },
    getTime() {
      if (this.$store.getters.getDeliveryMode === 'DELIVERY' && this.$store.getters.getDeliveryTime) {
        let hour = Dayjs(this.$store.getters.getDeliveryTime, "HH:mm")
        let hourTo = hour.add(this.getDeliveryIntervalTime, 'm')
        let text = hour.format("HH:mm") + " a " + hourTo.format("HH:mm")
        return text
      } else {
        return this.$store.getters.getDeliveryTime
      }

    },
  }
}
</script>

<style scoped>

</style>
