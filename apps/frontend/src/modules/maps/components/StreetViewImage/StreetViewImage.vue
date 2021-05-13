<template>
  <v-img contain eager v-if="image" :src="image"/>
</template>

<script>
import GoogleProvider from "@/modules/maps/providers/GoogleProvider";

export default {
  name: "StreetViewImage",
  props: {
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
  },
  data() {
    return {
      image: null
    }
  },
  mounted() {
    this.getGoogleImg()
  },
  methods: {
    getGoogleImg() {
      if (this.latitude && this.longitude) {
        GoogleProvider.googleStreetViewImage({latitude: this.latitude, longitude: this.longitude})
            .then(response => {
              this.image = response.data.googleStreetViewImage
            })
            .catch(e => console.error(e))
      }
    }
  }
}
</script>

<style scoped>

</style>
