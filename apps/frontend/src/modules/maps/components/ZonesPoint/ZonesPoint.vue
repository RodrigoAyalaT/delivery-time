<template>
  <div>
    <v-list>
      <v-list-item v-for="zone in zones" :key="zone.id">
        <v-list-item-title>{{zone.name}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import ZoneProvider from "@/modules/maps/providers/ZoneProvider";

export default {
  name: "ZonesPoint",
  props: {
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
  },
  data() {
    return {
      zones: []
    }
  },
  mounted() {
    this.fetchPointZones()
  },
  methods: {
    fetchPointZones() {
      if (this.latitude && this.longitude) {
        ZoneProvider.fetchZonesPoint({latitude: this.latitude, longitude: this.longitude})
            .then(r => {
              this.zones = r.data.zonesPoint
            })
            .catch(e => console.error(e))
      }
    }
  }
}
</script>

<style scoped>

</style>
