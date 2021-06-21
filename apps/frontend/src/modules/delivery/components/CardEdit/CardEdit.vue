<template>
  <v-card
      :class="getCardClass"
      :elevation="hover ? 10 : 1"
      v-on="$listeners"
      @mouseenter="hover=true"
      @mouseleave="hover=false"
  >
    <v-card-text>
      <slot></slot>
    </v-card-text>
    <v-btn v-if="hover"
           color="primary" class="onPrimary--text"
           x-small fab
           absolute :style="{top: '3%', right: '1%'}"
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
    textColor: {type: String, default: "grey--text text--darken-2"},
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
