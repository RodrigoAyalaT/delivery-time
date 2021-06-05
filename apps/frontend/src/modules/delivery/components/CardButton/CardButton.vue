<template>
  <v-card
      :class="getCardClass"
      :elevation="selected ? 8 : 1"
      class="text-center"
      v-on="$listeners"
  >
    <v-icon
        class="mt-4"
        :class="getIconClass"
        x-large
    >{{ icon }}
    </v-icon>
    <v-card-title class="justify-center noSelect">{{ title }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "CardButton",
  props: {
    title: {type: String},
    icon: {type: String},
    textColor: {type: String, default: "grey--text text-darken-2"},
    backgroundColor: {type: String, default: "white"},
    textColorSelected: {type: String, default: "onPrimary--text"},
    backgroundColorSelected: {type: String, default: "primary"},
    selected: {type: Boolean, default: false}
  },
  computed: {
    getCardClass() {
      if (this.selected) {
        return this.textColorSelected + ' ' + this.backgroundColorSelected
      } else {
        return this.textColor + ' ' + this.backgroundColor
      }
    },
    getIconClass() {
      if (this.selected) {
        return this.textColorSelected
      } else {
        return this.textColor
      }
    }

  }
}
</script>

<style scoped>
.noSelect {
  user-select: none;
}
</style>
