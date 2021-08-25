<template>
  <v-row>
    <v-col>
      <v-btn class="primary text--OnPrimary" @click="locationNew">Ingresar nueva dirección</v-btn>
    </v-col>

    <v-col>

      <v-list class="text-left">
        <v-list-item>
          <v-list-item-title class="font-weight-bold">Historial de direcciones</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
            v-for="(location,i) in $store.getters.getLocationHistory"
            :key="i"
            @click="locationSelected(location)"
            class="text-center"
        >
          <v-list-item-title>{{ location.address }}</v-list-item-title>
        </v-list-item>
      </v-list>


    </v-col>
  </v-row>

</template>

<script>
export default {
  name: "LocationHistory",
  methods: {
    locationSelected(location) {
      this.$emit('locationSelected',location)
    },
    locationNew(){
      this.$emit('locationNew')
    }

  }
}
</script>

<style scoped>

</style>
