<template>
  <v-simple-table>
    <thead>
    <tr>
      <th>{{ $t('delivery.order.labels.order') }}</th>
      <th>{{ $t('delivery.order.labels.name') }}</th>
      <th>{{ $t('delivery.schedule') }}</th>
      <th>{{ $t('common.next') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in orders" :key="order.identifier">
      <td>{{ prettyIdentifier(order.identifier) }}</td>
      <td>{{ order.contact.name }}</td>
      <td :class="getAlarmColor(order.delivery.time)">{{ order.delivery.time }}</td>
      <td>
        <v-btn fab x-small color="indigo" dark @click="$emit('next',order)">
          <v-icon>play_arrow</v-icon>
        </v-btn>

      </td>
    </tr>
    </tbody>


  </v-simple-table>
</template>

<script>
import {Dayjs} from '@dracul/dayjs-frontend'
export default {
  name: "OrderManagerTable",
  props: {
    orders: {type: Array, required: true}
  },
  computed: {
    getAlarmColor(){
      return hour => {
        let now  = Dayjs()
        let dhour = Dayjs(hour,"HH:mm")

        let dangerHour = now.add(10,'minute')
        if(dangerHour.isAfter(dhour)){
          console.log("DANGER",now.format("YYYY-MM-DD HH:mm"), dangerHour.format("YYYY-MM-DD HH:mm"))
          return 'red'
        }

        let warnHour = now.add(25,'m')
        if(warnHour.isAfter(dhour)){
          console.log("WARNING",now.format("YYYY-MM-DD HH:mm"), warnHour.format("YYYY-MM-DD HH:mm"))
          return 'yellow'
        }

        console.log("OK ",now.format("YYYY-MM-DD HH:mm"), warnHour.format("YYYY-MM-DD HH:mm"))
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
