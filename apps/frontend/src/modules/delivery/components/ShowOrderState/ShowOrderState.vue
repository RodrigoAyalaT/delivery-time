<template>
  <v-card   class="grey--text text--darken-2">
    <v-card-title>Estado</v-card-title>
    <v-card-text class="text-center">
      <h4 class="text-h4 primary--text">
        {{$t('delivery.states.'+state)}}
      </h4>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ShowOrderState",
  props: {
    state: String
  }
}
</script>

<style scoped>

</style>
