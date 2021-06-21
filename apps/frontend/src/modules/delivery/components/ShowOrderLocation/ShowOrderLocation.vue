<template>
  <v-card   class="grey--text text--darken-2">
    <v-card-title>
      {{ $t('delivery.mode.' + deliveryMode) }}
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-row dense>
          <template v-if="deliveryMode === 'TAKE_AWAY'">
            <v-col cols="12">
              <show-field
                  :value="$store.getters.getSetting('ShopAddress').value"
                  :label="$t('maps.location.labels.address')"
                  icon="location_on"
              />
            </v-col>
          </template>

          <template v-if="deliveryMode === 'DELIVERY'">
            <v-col cols="12" md="7">
              <show-field
                  :value="location.address"
                  :label="$t('maps.location.labels.address')"
                  icon="location_on"
              />
            </v-col>

            <v-col cols="12" md="5">
              <v-row no-gutters>
                <v-col cols="5">
                  <show-field
                      :value="location.floor"
                      :label="$t('maps.location.labels.floor')"
                      icon="apartment"
                  />
                </v-col>
                <v-col cols="7">
                  <show-field
                      :value="location.apartment"
                      :label="$t('maps.location.labels.apartment')"
                      icon="meeting_room"
                  />
                </v-col>

              </v-row>
            </v-col>

          </template>

          <v-col>
            <show-field
                :value="getTime"
                :label="$t('delivery.schedule')"
                icon="alarm"
            />

          </v-col>

        </v-row>
      </v-list>
    </v-card-text>




  </v-card>
</template>

<script>
import {ShowField} from '@dracul/common-frontend'

import {Dayjs} from "@dracul/dayjs-frontend"

export default {
  name: "OrderConfirmationLocation",
  props: {
    deliveryMode: {
      type: String,
      validator: function (value) {
        return ['TAKE_AWAY', 'DELIVERY'].indexOf(value) !== -1
      },
    },
    location: {type: Object},
    time: {type: String}
  },
  components: {ShowField},
  computed: {
    getDeliveryIntervalTime() {
      return this.$store.getters.getSetting('IntervalDeliveryTime').value
    },
    getTime() {
      if (this.deliveryMode === 'DELIVERY') {
        let hour = Dayjs(this.$store.getters.getDeliveryTime, "HH:mm")
        let hourTo = hour.add(this.getDeliveryIntervalTime, 'm')
        let text = hour.format("HH:mm") + " a " + hourTo.format("HH:mm")
        return text
      } else {
        return this.time
      }
    },
  }
}
</script>

<style scoped>

</style>
