<template>
  <v-card
      class="text-center"
      v-on="$listeners"
      :class="backgroundClass"
      :style="{width: 'auto'}"
     flat
  >

    <v-row>
      <v-col v-if="enableIcon"  class="text-right flex-grow-0">
        <v-icon
            class="ma-2"
            :class="iconClass"
            :size="60"
        >{{ icon }}
        </v-icon>
      </v-col>
      <v-col class="flex-grow-1 ">
        <h6 class="text-h6 text-center" :class="textClass">{{ title }}</h6>
        <h3 class=" text-h3 text-center font-weight-bold" :class="textClass">
          <template v-if="money">$</template>{{ quantity }}
        </h3>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CardTotal",
  props: {
    title: {type: String},
    quantity: {type: Number},
    icon: {type: String},
    enableIcon: {type: Boolean, default: false},
    money: {type: Boolean, default: false},
    iconClass: {type: String, default: "primary--text"},
    textClass: {type: String, default: "secondary--text"},
    backgroundClass: {type: String, default: "white"},
  },
}
</script>

<style scoped>
.noSelect {
  user-select: none;
}
</style>
