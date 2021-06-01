<template>
  <v-footer dark padless>
    <v-card
        flat
        tile
        min-width="100%"
    >
      <v-card-text>
        <v-row align="center" justify="space-between">
          <v-list class="py-0">
            <v-list-item>
              <v-list-item-content class="py-0">
                <v-list-item-subtitle>Dirección</v-list-item-subtitle>
                <v-list-item-title>Arcos 3182, CABA</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div class="text-center">
            <v-btn
                v-for="socialNetwork in socialNetworks"
                :key="socialNetwork.icon"
                class="mx-4 white--text"
                icon
            >
              <v-btn :href="socialNetwork.link" target="_blank" icon>
                <v-icon size="24px">
                  {{ socialNetwork.icon }}
                </v-icon>
              </v-btn>

            </v-btn>
          </div>
          <v-list class="py-0">

            <v-list-item>
              <v-list-item-content class="py-0">
                <v-list-item-subtitle>Teléfono</v-list-item-subtitle>
                <v-list-item-title>15 5045 6440</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-card-text>


      <v-divider></v-divider>

      <v-card-text class="text-center">
        {{ new Date().getFullYear() }} <strong>@EmpanadasTremendas</strong>
      </v-card-text>

    </v-card>
  </v-footer>
</template>

<script>

export default {
  name: "TheFooter",
  data: () => ({
    socialNetworks: [
      {
        icon:   'mdi-facebook',
        link: ''
      },
      {
       icon:   'mdi-instagram',
       link: 'https://www.instagram.com/empanadastremendas/'
      }


    ],
  }),
}
</script>

<style scoped>

</style>
