<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center">
        <v-img height="160" contain src="@/assets/img/LogoTremendas7.png"></v-img>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn x-large
               rounded
               color="primary"
               :to="{name:'OrderPage'}"
        >
          REALIZAR PEDIDO
        </v-btn>
        <h6 v-if="getBussinesHours" class="text-h6 grey--text text--darken-2 mt-2">{{getBussinesHours}}</h6>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-row justify="center">
          <v-col cols="12" sm="4">
            <v-card>
              <v-img
                  gradient="to top , rgba(40,40,0,0.9), rgba(235,229,120,0.4)"
                  height="130"
                  src="@/assets/img/Cocidas-1.jpg"
                  class="white--text d-flex align-center"
              >
                <div>
                  <h4 class="text-h4 font-weight-bold"> HORNEADAS</h4>
                  <p class="mb-0">
                    No queres hacer nada, solo entrarle a morir a unas empandas <b>tremendas</b>... Hacé tu pedido!
                  </p>
                </div>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card>
              <v-img
                  gradient="to top right,  rgba(6,13,82,0.9), rgba(27,50,162,0.4)"
                  height="130"
                  src="@/assets/img/Congeladas-2.jpg"
                  class="white--text d-flex align-center"
              >
                <div>
                  <h4 class="text-h4 font-weight-bold"> CONGELADAS</h4>
                  <p class="mb-0">
                    <b>Tremendas</b> llega hasta tu casa congeladas, listas para hornear en sólo unos minutos!
                  </p>
                </div>
              </v-img>
            </v-card>
          </v-col>


        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomePage',
  created() {
    this.$store.dispatch('loadSettings')
  },
  computed:{
    getBussinesHours(){
      if(this.$store.getters.isSettingsReady){
        return this.$store.getters.getSetting('businessHours').value
      }
      return null
    }
  }
}
</script>

<style scoped>
</style>
