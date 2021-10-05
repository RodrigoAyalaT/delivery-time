<template>
  <v-card
      :class="getCardClass"
      :elevation="hover ? 0 : 0"
      v-on="$listeners"
      @mouseenter="hover=true"
      @mouseleave="hover=false"
      flat
  >
      <slot></slot>
    <v-btn
           v-if="hover"
           color="primary"
           x-small icon
           absolute :style="{top: '5px', right: '5px'}"
           @click="$emit('edit')"
    >
      <v-icon>edit</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "CardEdit",
  props: {
    textColor: {type: String, default: ""},
    backgroundColor: {type: String, default: "white"},
  },
  data(){
    return {
      hover: false
    }
  },
  computed: {
    getCardClass() {
      return this.textColor + ' ' + this.backgroundColor
    }
  }
}
</script>

<style scoped>
.noSelect {
  user-select: none;
}
</style>
