<template>

  <v-container>

    <v-tabs  v-model="tab">
      <v-tab

          v-for="state in states"
          :key="state"
      >
        {{ state }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
          v-for="state in states"
          :key="state"
      >
        <order-manager :state="state"></order-manager>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import OrderManager from "@/modules/delivery/components/OrderManager/OrderManager";
export default {
  name: "OrderManagerPage",
  components: {OrderManager},
  data(){
    return {
      tab: 'NEW',
      states: ['NEW','PREPARING','READY','ON_THE_WAY','DELIVERED']
    }
  }
}
</script>

<style scoped>

</style>
