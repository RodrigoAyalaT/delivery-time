<template>
  <v-btn-toggle v-model="galleryView" dense mandatory>

    <v-btn :value="12" small icon>
      <v-icon class="grey--text text--darken-1">view_list</v-icon>
    </v-btn>

    <v-btn :value="6" small icon>
      <v-icon class="grey--text text--darken-1">view_module</v-icon>
    </v-btn>

    <v-btn :value="4" small icon>
      <v-icon class="grey--text text--darken-1">view_comfy</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "GalleryViewButtons",
  data() {
    return {
      gv: 1
    }
  },
  computed: {
    galleryView: {
      get() {
        return this.$store.getters.getGalleryView
      },
      set(val) {
        this.$store.commit('setGalleryView', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
