<template>
  <v-card height="100%">
    <v-card-title>Orden</v-card-title>
    <v-card-text class="text-center">
      <h4 class="text-h5 primary--text">
        {{identifier}}
      </h4>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ShowOrderIdentifier",
  props: {
    identifier: String
  }
}
</script>

<style scoped>

</style>
