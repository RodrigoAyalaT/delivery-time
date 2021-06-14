<template>

  <v-row no-gutters>

    <v-col cols="10">
      <div style="height: 400px; width:100%;" id="map" ref="map"></div>
    </v-col>
    <v-col cols="2">

      <v-row no-gutters justify="center" align="center" class="px-2">


        <v-col cols="12">
          <v-text-field
              v-model.number="center.lat"
              label="Lat"
              type="number"
              step="0.000001"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
              v-model.number="center.lng"
              label="Lng"
              type="number"
              step="0.000001"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
              v-model.number="radius"
              label="radius"
              type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="text-center">
          <v-btn class="my-1" fab small top right @click="reset('triangle')">
            <v-icon>change_history</v-icon>
          </v-btn>
          <v-btn class="my-1" fab small top right @click="reset('square')">
            <v-icon>crop_square</v-icon>
          </v-btn>
          <v-btn class="my-1" fab small top right @click="reset('hexagone')">
            <v-icon>report</v-icon>
          </v-btn>
          <v-btn class="my-1" fab small top right @click="reset('diamond')">
            <v-icon>directions</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12" class="text-center">
          <v-switch v-model="showLabels" label="Labels"></v-switch>
        </v-col>

      </v-row>


    </v-col>


  </v-row>

</template>

<script>
import gmapsinit from "../../gmaps";
import ZoneProvider from "@/modules/maps/providers/ZoneProvider";

export default {
  name: "ZoneMap",
  props: {
    value: {type: Array},
    id: {type: String},
    color: {type: String},
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

  },
  watch: {
    coordinates: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  created() {
    gmapsinit().then(r => {
      this.google = r
      this.initMap()
      const googleScript = document.getElementById('google-map-script')

      if (window.google) {
        this.setPolygon()
        this.fetchZones()
      } else {
        googleScript.addEventListener('load', () => {
          this.setPolygon()
          this.fetchZones()
        })

      }


    });

  },
  data() {
    return {
      title: this.$t('people.person.map'),
      google: null,
      map: null,
      polygon: null,
      base: 'square',
      zones: [],
      zonesLoading: false,
      labels: [],
      showLabels: true,
      center: {lat: -34.5507742, lng: -58.4651215},
      radius: 500, //radius in meters
    }
  },

  methods: {
    drawHexagon() {
      let coordinates = [];
      let position = this.map.getCenter();
      for (let angle = -90; angle < 270; angle += 60) {
        coordinates.push(window.google.maps.geometry.spherical.computeOffset(position, this.radius, angle));
      }
      return coordinates
    },
    drawTriangle() {
      let coordinates = [];
      let position = this.map.getCenter();
      for (let angle = -90; angle < 180; angle += 90) {
        coordinates.push(window.google.maps.geometry.spherical.computeOffset(position, this.radius, angle));
      }
      return coordinates
    },
    drawDiamond() {
      let coordinates = [];
      //let position = new window.google.maps.LatLng(this.center.lat, this.center.lng);
      let position = this.map.getCenter();
      for (let angle = -90; angle < 270; angle += 90) {
        coordinates.push(window.google.maps.geometry.spherical.computeOffset(position, this.radius, angle));
      }
      return coordinates
    },
    drawSquare() {
      let coordinates = [];
      let position = this.map.getCenter();
      for (let angle = -135; angle < 360; angle += 90) {
        coordinates.push(window.google.maps.geometry.spherical.computeOffset(position, this.radius, angle));
      }
      return coordinates
    },
    getBasePolygon() {
      switch (this.base) {
        case 'square':
          return this.drawSquare()
        case 'triangle':
          return this.drawTriangle()
        case 'hexagone':
          return this.drawHexagon()
        case 'diamond':
          return this.drawDiamond()
        default:
          return this.drawSquare()
      }
    },
    fetchZones() {
      this.zonesLoading = true
      ZoneProvider.fetchZones()
          .then(r => {
            this.zones = r.data.zoneFetch
            this.drawZones()
          })
          .catch(e => {
            console.error(e)
          })
          .finally(() => this.zonesLoading = false)
    },

    attachPolygonInfoWindow(polygon, name) {
      let infoWindow = new window.google.maps.InfoWindow();
      let center = this.polygonGetCenter(polygon)
      let self = this
      window.google.maps.event.addListener(polygon, 'mouseover', function () {
        if(self.showLabels){
          infoWindow.setContent(name);
          infoWindow.setPosition(center);
          infoWindow.open(this.map);
        }
      })
    },
    polygonGetCenter(polygonCoords) {
      let bounds = new window.google.maps.LatLngBounds();
      let i;

      for (i = 0; i < polygonCoords.getPath().getArray().length; i++) {
        bounds.extend(polygonCoords.getPath().getArray()[i]);
      }

      return bounds.getCenter()
    },
    drawZones() {
      this.zones.filter(z => z.id != this.id).forEach(zone => {
        let zonePolygon = new window.google.maps.Polygon({
          paths: this.getPolyCoordsGmapsFormat(zone.location.coordinates[0]),
          strokeColor: zone.color ? zone.color : '#0000FF',
          strokeOpacity: 0.3,
          strokeWeight: 2,
          fillColor: zone.color ? zone.color : '#0000FF',
          fillOpacity: 0.10,
          label: zone.name
        });
        zonePolygon.setMap(this.map);
        zonePolygon.setEditable(false)
        zonePolygon.setDraggable(false)
        this.attachPolygonInfoWindow(zonePolygon, zone.name)
      })

    },
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
        zoom: 13,
        center: this.center,
        mapTypeId: 'terrain'
      });
    },
    getPolyCoordsGmapsFormat(coordinates) {
      return coordinates.map(a => {
        return {lat: a[1], lng: a[0]}
      })
    },
    setPolygon(reset = false) {

      // Define the LatLng coordinates for the polygon's path.
      let polyCoords
      if (!reset && this.coordinates && this.coordinates[0] && this.coordinates[0].length) {
        polyCoords = this.getPolyCoordsGmapsFormat(this.coordinates[0])
      } else {
        polyCoords = this.getBasePolygon()
      }


      // Construct the polygon.
      this.polygon = new this.google.maps.Polygon({
        paths: polyCoords,
        strokeColor: this.color ? this.color : '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: this.color ? this.color : '#FF0000',
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
        //Close Loop
        if (c[0][0] != c[c.length - 1][0] || c[0][1] != c[c.length - 1][1]) {
          c.push([c[0][0], c[0][1]])
        }

        this.coordinates = [c]
      }
    }
  }
}
</script>

<style scoped>

</style>
