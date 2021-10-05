<template>
  <v-card :flat="flat">
    <v-card-title v-if="title" class="py-2">
      {{ $t(title) }}
    </v-card-title>

    <v-row no-gutters>
      <template v-if="order.delivery.mode === 'TAKE_AWAY'">
        <v-col cols="12" md="4">
          <show-field
              :value="$t('delivery.mode.method.'+order.delivery.mode)"
              :label="$t('delivery.mode.deliveryMode')"
              icon="store"
          />
        </v-col>

        <v-col cols="12" md="4">
          <show-field
              :value="order.location.address"
              :label="$t('maps.location.labels.address')"
              icon="location_on"
          />
        </v-col>

        <v-col cols="12" md="4">
          <show-field
              :value="getTime"
              :label="$t('delivery.schedule')"
              icon="alarm"
          />
        </v-col>

      </template>

      <template v-if="order.delivery.mode === 'DELIVERY'">

        <v-col cols="12" md="4">
          <show-field
              :value="$t('delivery.mode.method.'+order.delivery.mode)"
              :label="$t('delivery.mode.deliveryMode')"
              icon="delivery_dining"
          />
        </v-col>

        <v-col cols="12" md="4">
          <show-field
              :value="getTime"
              :label="$t('delivery.schedule')"
              icon="alarm"
          />
        </v-col>


        <v-col cols="12" md="7">
          <show-field
              :value="order.location.address"
              :label="$t('maps.location.labels.address')"
              icon="location_on"
          />
        </v-col>

        <v-col cols="12" md="5">
          <v-row no-gutters>
            <v-col cols="5">
              <show-field
                  :value="order.location.floor"
                  :label="$t('maps.location.labels.floor')"
                  icon="apartment"
              />
            </v-col>
            <v-col cols="7">
              <show-field
                  :value="order.location.apartment"
                  :label="$t('maps.location.labels.apartment')"
                  icon="meeting_room"
              />
            </v-col>

          </v-row>
        </v-col>


      </template>

    </v-row>
    <v-divider v-if="divider"></v-divider>
  </v-card>
</template>

<script>
import {Dayjs} from "@dracul/dayjs-frontend";
import {ShowField} from '@dracul/common-frontend'

export default {
  name: "OrderLocation",
  components: {ShowField},
  props: {
    divider: {type:Boolean, default: false},
    flat: {type:Boolean, default: false},
    order: {type:Object, required: true},
    title: {type: String, default: 'delivery.mode.deliveryMode'},

  },
  computed: {
    getDeliveryIntervalTime() {
      return this.$store.getters.getSetting('IntervalDeliveryTime').value
    },
    getTime() {
      if (this.order.delivery.mode === 'DELIVERY' && this.order.delivery.time) {
        let hour = Dayjs(this.order.delivery.time, "HH:mm")
        let hourTo = hour.add(this.getDeliveryIntervalTime, 'm')
        let text = hour.format("HH:mm") + " a " + hourTo.format("HH:mm")
        return text
      } else {
        return this.order.delivery.time
      }

    },
  }
}
</script>

<style scoped>

</style>
