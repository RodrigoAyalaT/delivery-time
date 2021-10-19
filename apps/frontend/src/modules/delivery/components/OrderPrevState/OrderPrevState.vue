<template>

      <v-btn
          color="red"
          dark
          x-small fab
          @click="prev"
      >
        <v-icon>undo</v-icon>
      </v-btn>

</template>

<script>

export default {
  name: "OrderPrevState",
  props: {
    order: {type: Object},
  },
  methods: {
    prev() {
      this.$emit('prev', this.order)
    }
  }
}
</script>

<style scoped>

</style>
