<template>
  <transition
      mode="out-in"
      enter-active-class="animate__animated animate__heartBeat"
  >
    <v-btn
        v-if="show"
        :style="{'z-index':5}"
        color="primary" fixed bottom right
        @click="$emit('click')"
        class="mt-6"
        fab large
    >
      <v-icon>shopping_cart</v-icon>
      {{ total }}
    </v-btn>
  </transition>

</template>

<script>
export default {
  name: "CartButton",
  props: {
    total: {type: Number, default: 0}
  },
  data() {
    return {
      show: true
    }
  },
  watch: {
    total() {
      this.show = false
      this.$nextTick(() => this.show = true)
    }
  }
}
</script>

<style scoped>

</style>
