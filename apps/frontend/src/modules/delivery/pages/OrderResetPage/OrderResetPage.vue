<template>
  <v-container>
    <h1>Order Reset</h1>

    <v-card>
      <v-card-title>
        Orden Actual:
      </v-card-title>
      <v-card-subtitle>{{$store.getters.getCurrentOrderIdentifier}}</v-card-subtitle>
    </v-card>
    <v-divider class="my-3"></v-divider>
    <v-btn
        @click="$store.dispatch('resetOrder')"
    >
      Reiniciar orden
    </v-btn>

  </v-container>
</template>

<script>
export default {
  name: "OrderResetPage"
}
</script>

<style scoped>

</style>
