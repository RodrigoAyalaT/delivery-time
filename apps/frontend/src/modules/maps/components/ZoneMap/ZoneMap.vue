<template>

  <v-row>

    <v-col cols="11">
      <div style="height: 350px; width:100%;" id="map" ref="map"></div>
    </v-col>
    <v-col cols="1">
      <v-btn class="my-1" fab small top right @click="reset('triangle')">
        <v-icon>change_history</v-icon>
      </v-btn>
      <v-btn class="my-1" fab small top right @click="reset('square')">
        <v-icon>crop_square</v-icon>
      </v-btn>
    </v-col>


  </v-row>

</template>

<script>
import gmapsinit from "../../gmaps";

export default {
  name: "ZoneMap",
  props: {
    value: {type: Array}
  },
  computed: {
    coordinates: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    getBasePolygon() {
      switch (this.base) {
        case 'square':
          return this.baseSquarePolygon
        case 'triangle':
          return this.baseTrianglePolygon
        default:
          return this.baseSquarePolygon
      }
    }
  },
  watch: {
    coordinates: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  async mounted() {
    this.google = await gmapsinit();
    this.initMap()
    this.setPolygon()
  },
  data() {
    return {
      title: this.$t('people.person.map'),
      google: null,
      map: null,
      polygon: null,
      base: 'square',
      baseSquarePolygon: [
        {lat: -34.6300, lng: -58.44000},
        {lat: -34.6300, lng: -58.52000},
        {lat: -34.5800, lng: -58.52000},
        {lat: -34.5800, lng: -58.44000},
        {lat: -34.6300, lng: -58.44000}
      ],
      baseTrianglePolygon: [
        {lat: -34.6300, lng: -58.44000},
        {lat: -34.6300, lng: -58.52000},
        {lat: -34.5800, lng: -58.48000},
        {lat: -34.6300, lng: -58.44000}
      ]
    }
  },

  methods: {
    apply() {
      //  this.coordinates.push(this.coordinates[0])
      this.$emit('coords', this.coordinates)
    },
    reset(base = 'square') {
      this.base = base
      this.polygon.setMap(null);
      this.setPolygon(true)
    },
    initMap() {
      this.map = new this.google.maps.Map(this.$refs.map, {
        zoom: 12,
        center: {lat: -34.6000, lng: -58.50000},
        mapTypeId: 'terrain'
      });
    },
    setPolygon(reset = false) {

      // Define the LatLng coordinates for the polygon's path.
      let polyCoords
      if (!reset && this.coordinates && this.coordinates.length) {
        polyCoords = this.coordinates.map(a => {
          return {lat: a[1][0], lng: a[0][0]}
        })
      } else {
        polyCoords = this.getBasePolygon
      }


      // Construct the polygon.
      this.polygon = new this.google.maps.Polygon({
        paths: polyCoords,
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,

      });
      this.polygon.setMap(this.map);
      this.polygon.setEditable(true)
      this.polygon.setDraggable(true)
      this.getPolygonPath()

      this.google.maps.event.addListener(this.polygon.getPath(), "insert_at", this.getPolygonPath);
      this.google.maps.event.addListener(this.polygon.getPath(), "remove_at", this.getPolygonPath);
      this.google.maps.event.addListener(this.polygon.getPath(), "set_at", this.getPolygonPath);
      this.google.maps.event.addListener(this.polygon, 'dragend', this.getPolygonPath);

    },
    getPolygonPath() {
      if (this.polygon) {
        let c = []
        for (let point of this.polygon.getPath().getArray()) {
          c.push([point.lng(), point.lat()]);
        }
        this.coordinates = c
      }
    }
  }
}
</script>

<style scoped>

</style>
