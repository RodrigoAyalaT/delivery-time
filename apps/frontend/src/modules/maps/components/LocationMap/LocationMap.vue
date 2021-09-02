<template>

  <div :style="{height: height, width:'100%'}" id="map" ref="map"></div>

</template>

<script>
import gmapsinit from "../../gmaps";

export default {
  name: "LocationMap",
  props: {
    value: {type: Object},
    height: {type: String, default: '300px'},
    zoom: {type: Number, default: 16}
  },
  computed: {
    location: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    getLatLng() {
      return {lat: this.location.latitude, lng: this.location.longitude}
    }
  },
  data() {
    return {
      google: null,
      map: null,
      polygon: null,
    }
  },
  async mounted() {
    this.google = await gmapsinit();
    this.initMap()
    this.setLocation()
  },
  methods: {
    initMap() {
      this.map = new this.google.maps.Map(this.$refs.map, {
        zoom: this.zoom,
        center: this.getLatLng,
        mapTypeId: 'terrain'
      });
    },
    setLocation() {
      new this.google.maps.Marker({
        position: this.getLatLng,
        map: this.map,
        title: this.location.address,
      });
    },
  }
}
</script>

<style scoped>

</style>
