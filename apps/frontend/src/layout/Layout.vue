<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes[theme].background}">
    <v-navigation-drawer app v-model="drawer" disable-route-watcher temporary clipped fixed>
      <sidebar-menu :nav="menu" v-on:closeDrawer="drawer = false"></sidebar-menu>
    </v-navigation-drawer>

    <v-app-bar app absolute color="primary" :clipped-left="clipped"
    src="@/assets/img/AppBarMini.png"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top, rgba(0,0,0,0.2), rgba(0,0,0,0.7)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon class="onPrimary--text" @click="drawer=!drawer"/>
      <slot name="toolbar-left"></slot>
      <v-spacer></v-spacer>
      <slot name="toolbar-right"></slot>
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>

    <the-footer></the-footer>

  </v-app>
</template>

<script>
import SidebarMenu from './SidebarMenu'
import TheFooter from './TheFooter'

export default {
  components: {SidebarMenu, TheFooter},
  props: {
    menu: {type: Array, default: null},
  },
  data: () => ({
        drawer: false,
        clipped: true,
      }
  ),
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>

