<template>
  <v-card
      :color="selected ? backgroundSelected : null"
      :elevation="selected ? 8 : 1"
      class="text-center"
      v-on="$listeners"
  >
    <v-icon class="mt-4" x-large>{{icon}}</v-icon>
    <v-card-title class="justify-center noSelect">{{title}}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "CardButton",
  props: {
    title: {type: String},
    icon: {type: String},
    color: {type: String, default: "grey--text text-darken-2"},
    backgroundSelected: {type: String, default: "green"},
    selected: {type: Boolean, default: false}
  }
}
</script>

<style scoped>
.noSelect {
  user-select: none;
}
</style>
