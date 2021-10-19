<template>
  <v-simple-table fixed-header>
    <thead>
    <tr>
      <th>{{ $t('delivery.order.labels.order') }}</th>
     <!-- <th>{{ $t('delivery.order.labels.name') }}</th>-->
      <th v-if="mode === 'DELIVERY'">{{ $t('delivery.order.labels.address') }}</th>
      <th v-if="enableZone">{{ $t('maps.zone.zone') }}</th>
      <th>{{ $t('delivery.schedule') }}</th>
      <th v-if="state != 'RECEIPT_PENDING'"
          :style="{width:'56px'}">
        <v-icon>undo</v-icon>
      </th>
      <th v-if="state != 'DELIVERED'"
          :style="{width:(mode != 'DELIVERY' ? '56px':'')}"
      >
        <v-icon>play_arrow</v-icon>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in orders" :key="order.identifier">
      <td>

        <order-menu :order="order"
                    :items="order.items"
                    @showOrder="$emit('showOrder', order)"
        ></order-menu>
      </td>
    <!--  <td>{{ order.contact.name }}</td>-->
      <td v-if="mode === 'DELIVERY'">{{ order.location.address }}</td>
      <td v-if="enableZone">
        <v-avatar
            :color="getColorZone(order.zoneName)"
            class="white--text"
            size="30">
          {{ order.zoneName }}
        </v-avatar>
      </td>
      <td :class="getAlarmColor(order.delivery.time)">{{ order.delivery.time }}</td>
      <td>
        <order-prev-state @prev="$emit('prev',order)"></order-prev-state>
      </td>
      <td>
        <order-next-state :order="order" @next="$emit('next', order)"/>
      </td>
    </tr>
    </tbody>


  </v-simple-table>
</template>

<script>
import {Dayjs} from '@dracul/dayjs-frontend'

import OrderNextState from "@/modules/delivery/components/OrderNextState/OrderNextState";
import OrderMenu from "@/modules/delivery/components/OrderMenu/OrderMenu";
import OrderPrevState from "@/modules/delivery/components/OrderPrevState/OrderPrevState";

export default {
  name: "OrderManagerTable",
  components: {OrderPrevState, OrderMenu, OrderNextState},
  props: {
    state: {type: String},
    mode: {type: String},
    orders: {type: Array, required: true},
    zones: {type: Array},
    enableZone: {type: Boolean, default: false}
  },
  computed: {
    getColorZone() {
      return zoneName => {
        if (this.zones && this.zones.length) {
          let zone = this.zones.find(zone => zone.name == zoneName)
          return zone.color
        } else {
          return 'primary'
        }
      }
    },
    getAlarmColor() {
      return hour => {
        let now = Dayjs()
        let dhour = Dayjs(hour, "HH:mm")

        let dangerHour = now.add(10, 'minute')
        if (dangerHour.isAfter(dhour)) {
          // console.log("DANGER",now.format("YYYY-MM-DD HH:mm"), dangerHour.format("YYYY-MM-DD HH:mm"))
          return 'red'
        }

        let warnHour = now.add(25, 'm')
        if (warnHour.isAfter(dhour)) {
          // console.log("WARNING",now.format("YYYY-MM-DD HH:mm"), warnHour.format("YYYY-MM-DD HH:mm"))
          return 'yellow'
        }

        //console.log("OK ",now.format("YYYY-MM-DD HH:mm"), warnHour.format("YYYY-MM-DD HH:mm"))
        return 'green'

      }

    },
    prettyIdentifier() {
      return identifier => {
        const pair = Array.from(identifier)
        pair.splice(3, 0, ' - ')
        return pair.join("")
      }
    }
  }
}
</script>

<style scoped>

</style>
