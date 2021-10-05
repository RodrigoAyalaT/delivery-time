<template>
  <v-row justify="center" dense>

    <v-col cols="12">
      <v-row justify="center" dense>
        <v-col cols="12" >
          <location-history
              v-if="!dense && $store.getters.hasLocationHistory && showLocation === false && !location.address"
              @locationSelected="locationSelected"
              @locationNew="locationNew"
          ></location-history>
          <location-form
              v-else
              v-model="location"
              :enable-map="!dense"
              map-height="200px"
              :address-sm-col="12"
              :apartment-sm-col="6"
              :floor-sm-col="6"
              :map-sm-col="12"
              @clear="clear"
              address-hint="Calle + altura +  localidad. Ej: 	Arcos 3182 caba"
          ></location-form>
        </v-col>

      </v-row>
    </v-col>

    <v-col v-if="zone && zone.value" cols="12">
      <v-alert   class="text-left" dense type="info" >Costo de envío: <b>${{zone.value}}</b> </v-alert>
    </v-col>

    <!--#[EN HORA]-->
    <v-col v-if="isActiveHours" cols="12">
      <v-row justify="center" dense>

        <!--#[EN ZONA] => LOADING -->
        <v-col v-if="loadingInZone" cols="12">
          <loading :text="$t('maps.zone.determiningZone')"></loading>
        </v-col>

        <!--#[EN ZONA] => TRUE -->
        <v-col v-else-if="inZone === true && loadingInZone === false"
               cols="12"
        >
          <schedule-as-son-as-posible-time
              :calendar="calendar"
              v-model="time"
              enable-delivery-time
          />
        </v-col>

        <!--#[FUERA  ZONA] => FALSE -->
        <v-col v-else-if="inZone === false && loadingInZone === false"
               cols="12"
        >
          <v-alert
              type="warning"
              class="text-left"
              rounded
              text
              outlined
              prominent
          >
            {{ getMessageOutOfZone }}
          </v-alert>
          <v-btn
              v-if="!dense"
              class="green white--text"
              :href="getWhatsappLink"
              target="_blank"
          >
            <v-icon left>contact_support</v-icon>
            Whatsapp
          </v-btn>
        </v-col>

      </v-row>
    </v-col>

    <!--#[FUERA DE HORA] => FALSE -->
    <v-col v-if="!isActiveHours" cols="12">
      <v-row justify="center" dense>

        <!--#[EN ZONA] => LOADING -->
        <v-col v-if="loadingInZone" cols="12">
          <loading text="maps.zone.determiningZone"></loading>
        </v-col>

        <!--#[EN ZONA] => TRUE -->
        <v-col v-else-if="inZone === true && loadingInZone === false"
               cols="12"
        >
          <!--#[EN ZONA] => FUERA DE HORA -->
          <v-alert v-if="!isActiveHours && !dense"
                   type="warning"
                   class="text-left"
                   rounded
                   text
                   outlined
                   prominent
          >
            {{ getMessageOutOfTime }}
          </v-alert>
          <schedule-time v-model="time" :calendar="calendar" delivery-mode></schedule-time>
        </v-col>

        <!--#[FUERA  ZONA] => FALSE -->
        <v-col v-else-if="inZone === false && loadingInZone === false"
               cols="12"
        >
          <v-alert
              type="warning"
              class="text-left"
              rounded
              text
              outlined
              prominent
          >
            {{ getMessageOutOfZone }}
          </v-alert>
          <v-btn
              v-if="!dense"
              class="green white--text"
              :href="getWhatsappLink"
              target="_blank"
          >
            <v-icon left>contact_support</v-icon>
            Whatsapp
          </v-btn>
        </v-col>

      </v-row>
    </v-col>

    <!--VISUALIZAR ZONA-->


    <v-col v-if="!dense && time && location && location.address && showLocation && inZone" cols="12">

      <submit-button :text="'common.next'" @click="$emit('confirm')"></submit-button>
    </v-col>

  </v-row>
</template>

<script>
import CalendarIsActive from "@/modules/calendar/mixins/CalendarIsActive";
import {SubmitButton, Loading} from "@dracul/common-frontend"
import LocationForm from "@/modules/maps/components/LocationForm/LocationForm";
import LocationIsInZone from "@/modules/maps/mixins/LocationIsInZone";
import ScheduleAsSonAsPosibleTime
  from "@/modules/delivery/components/ScheduleAsSonAsPosibleTime/ScheduleAsSonAsPosibleTime";
import ScheduleTime from "@/modules/delivery/components/ScheduleTime/ScheduleTime";
import LocationHistory from "@/modules/delivery/components/LocationHistory/LocationHistory";

const AS_SON_AS_POSIBLE = 'AS_SON_AS_POSIBLE'
const SCHEDULED = 'SCHEDULED'
export default {
  name: "OrderModeDelivery",
  components: {LocationHistory, ScheduleTime, ScheduleAsSonAsPosibleTime, LocationForm, SubmitButton, Loading},
  mixins: [CalendarIsActive, LocationIsInZone],
  props: {
    calendar: {type: Object, required: true},
    dense: {type: Boolean, default: false}
  },
  data() {
    return {
      isActiveHours: null,
      showLocation: false
    }
  },
  created() {
    //this.recoveryLastLocation()
  },
  mounted() {
    this.determineActiveHours()
    this.determineZoneAndDeliveryCost(this.location)
    if(this.location){
      this.showLocation = true
    }
  },
  computed: {
    location: {
      get() {
        return this.$store.getters.getOrderLocation
      },
      set(val) {
        this.showLocation = true
        this.$store.commit('setOrderLocation', val)
        this.$store.commit('addLocationHistory', val)
        this.determineZoneAndDeliveryCost(val)
      }
    },
    getMessageOutOfTime() {
      return this.$store.getters.getSetting('MessageOutOfTime').value
    },
    getMessageOutOfZone() {
      return this.$store.getters.getSetting('MessageOutOfZone').value
    },
    getWhatsappNumber() {
      return this.$store.getters.getSetting('WhatsappNumber').value
    },
    getWhatsappLink() {
      return 'https://api.whatsapp.com/send?phone=' + this.getWhatsappNumber
    },
    isAsSonAsPosible() {
      return this.$store.getters.getDeliveryTimeMode == AS_SON_AS_POSIBLE
    },
    isScheduled() {
      return this.$store.getters.getDeliveryTimeMode == SCHEDULED
    },
    time: {
      get() {
        return this.$store.getters.getDeliveryTime
      },
      set(v) {
        this.scheduled()
        this.setDeliveryTime(v)
      }
    }
  },

  methods: {
    locationSelected(location){
      this.location = Object.assign({},location)
      this.showLocation = true
    },
    locationNew(){
      this.$store.commit('clearOrderLocation')
      this.showLocation = true
    },
    clear(){
      this.clearZone()
    },
    recoveryLastLocation(){
      this.$store.commit('recoveryLastLocation')
    },
    determineActiveHours() {
      this.isActiveHours = this.calendarIsActive(this.calendar)
    },
    determineZoneAndDeliveryCost(location){
      this.findLocationZone(location).then(zone => {
        if(zone){
          this.$store.commit('setOrderDeliveryCost',zone.value)
        }else{
          this.$store.commit('setOrderDeliveryCost',0)
        }
      })
    },
    isBusinessHours() {
      return true
    },
    asSonAsPosible() {
      this.$store.commit('setOrderDeliveryTimeMode', AS_SON_AS_POSIBLE)
    },
    scheduled() {
      this.$store.commit('setOrderDeliveryTimeMode', SCHEDULED)
    },
    setDeliveryTime(val) {
      this.$store.commit('setOrderDeliveryTime', val)
    }
  }
}
</script>

<style scoped>

</style>
