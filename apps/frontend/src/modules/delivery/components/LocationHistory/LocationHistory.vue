<template>
  <v-row>
    <v-col cols="12" class="pt-6">
      <v-btn class="primary--text OnPrimary" @click="locationNew">Ingresar nueva dirección</v-btn>
    </v-col>

    <v-col cols="12">
      <span>ó</span>
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-list tile class="text-center pt-0">
        <v-list-item>
          <v-list-item-title class="font-weight-bold">Historial de direcciones</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
            v-for="(location,i) in $store.getters.getLocationHistory"
            :key="i"
            class="text-center"
        >

          <v-list-item-title
              :style="{cursor: 'pointer'}"
              @click="locationSelected(location)"
          >
            {{ location.address }}
          </v-list-item-title>
          <v-list-item-action>
            <v-btn icon @click="removeLocation(location)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-item-action>
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
    },
    removeLocation(location){
      this.$store.commit('clearOrderLocation')
      this.$store.commit('removeOrderToHistory',location)
    }

  }
}
</script>

<style scoped>

</style>
