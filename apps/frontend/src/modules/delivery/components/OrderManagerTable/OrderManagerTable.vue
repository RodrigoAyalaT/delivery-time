<template>
  <v-simple-table>
    <thead>
    <tr>
      <th>{{ $t('delivery.order.labels.identifier') }}</th>
      <th>{{ $t('delivery.order.labels.name') }}</th>
      <th>{{ $t('delivery.schedule') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in orders" :key="order.identifier">
      <td>{{ order.identifier }}</td>
      <td>{{ order.contact.name }}</td>
      <td>{{ order.delivery.time }}</td>
    </tr>
    </tbody>


  </v-simple-table>
</template>

<script>
export default {
  name: "OrderManagerTable",
  props:{
    orders: {type:Object, required: true}
  }
}
</script>

<style scoped>

</style>
