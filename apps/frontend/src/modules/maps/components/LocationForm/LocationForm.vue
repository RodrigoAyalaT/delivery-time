<template>
  <v-form ref="form" autocomplete="off" @submit.prevent="save">
    <v-row>

      <v-col cols="12" :sm="addressSmCol">

        <address-autocomplete
            prepend-inner-icon="location_on"
            :value="form.address"
            hide-details
            @input="(val) => (form.address = val)"
            @lat="(val) => (form.latitude = val)"
            @lng="(val) => (form.longitude = val)"
            @country="(val) => (form.country = val)"
            @postalCode="(val) => (form.postalCode = val)"
            @province="(val) => (form.province = val)"
            @locality="(val) => (form.locality = val)"
            @clear="$emit('clear')"
        ></address-autocomplete>
      </v-col>


      <v-col cols="6" :sm="apartmentSmCol">
        <v-text-field

            prepend-inner-icon="apartment"
            name="floor"
            v-model="form.floor"
            :label="$t('maps.location.labels.floor')"
            :placeholder="$t('maps.location.labels.floor')"
            :error="hasInputErrors('floor')"
            :error-messages="getInputErrors('floor')"
            color="secondary"

        ></v-text-field>
      </v-col>


      <v-col cols="6" :sm="floorSmCol">
        <v-text-field

            prepend-inner-icon="meeting_room"
            name="apartment"
            v-model="form.apartment"
            :label="$t('maps.location.labels.apartment')"
            :placeholder="$t('maps.location.labels.apartment')"
            :error="hasInputErrors('apartment')"
            :error-messages="getInputErrors('apartment')"
            color="secondary"

        ></v-text-field>
      </v-col>


      <v-col v-if="enableCoordinates" cols="12" sm="3">
        <v-text-field

            prepend-inner-icon="explore"
            name="latitude"
            v-model.number="form.latitude"
            type="number"
            :label="$t('maps.location.labels.latitude')"
            :placeholder="$t('maps.location.labels.latitude')"
            :error="hasInputErrors('latitude')"
            :error-messages="getInputErrors('latitude')"
            color="secondary"

        ></v-text-field>
      </v-col>


      <v-col v-if="enableCoordinates" cols="12" sm="3">
        <v-text-field

            prepend-inner-icon="explore"
            name="longitude"
            v-model.number="form.longitude"
            type="number"
            :label="$t('maps.location.labels.longitude')"
            :placeholder="$t('maps.location.labels.longitude')"
            :error="hasInputErrors('longitude')"
            :error-messages="getInputErrors('longitude')"
            color="secondary"

        ></v-text-field>
      </v-col>


      <v-col v-if="enableCountry" cols="12" sm="6">
        <v-text-field

            prepend-inner-icon="flag"
            name="country"
            v-model="form.country"
            :label="$t('maps.location.labels.country')"
            :placeholder="$t('maps.location.labels.country')"
            :error="hasInputErrors('country')"
            :error-messages="getInputErrors('country')"
            color="secondary"

        ></v-text-field>
      </v-col>


      <v-col v-if="enableProvince" cols="12" sm="4">
        <v-text-field

            prepend-inner-icon="villa"
            name="province"
            v-model="form.province"
            :label="$t('maps.location.labels.province')"
            :placeholder="$t('maps.location.labels.province')"
            :error="hasInputErrors('province')"
            :error-messages="getInputErrors('province')"
            color="secondary"

        ></v-text-field>
      </v-col>


      <v-col v-if="enableLocality" cols="12" sm="4">
        <v-text-field

            prepend-inner-icon="location_city"
            name="locality"
            v-model="form.locality"
            :label="$t('maps.location.labels.locality')"
            :placeholder="$t('maps.location.labels.locality')"
            :error="hasInputErrors('locality')"
            :error-messages="getInputErrors('locality')"
            color="secondary"

        ></v-text-field>
      </v-col>


      <v-col v-if="enablePostalCode" cols="12" sm="4">
        <v-text-field

            prepend-inner-icon="local_shipping"
            name="postalCode"
            v-model="form.postalCode"
            :label="$t('maps.location.labels.postalCode')"
            :placeholder="$t('maps.location.labels.postalCode')"
            :error="hasInputErrors('postalCode')"
            :error-messages="getInputErrors('postalCode')"
            color="secondary"

        ></v-text-field>
      </v-col>
    </v-row>


    <v-row align="center" justify="center">
      <v-col v-if="enableMap" cols="12" :sm="mapSmCol">
        <location-map
            v-if="form.latitude && form.longitude"
            v-model="form"
            :height="mapHeight"
        ></location-map>
      </v-col>

      <v-col v-if="enableStreetView" cols="12" sm="3">
        <street-view-image v-if="form.latitude && form.longitude"
                           :latitude="form.latitude"
                           :longitude="form.longitude"
        >

        </street-view-image>
      </v-col>

      <v-col v-if="enableZone" cols="12" sm="3" class="text-center">
        <v-card>
            <zones-point
                v-if="form.latitude && form.longitude"
                :latitude="form.latitude"
                :longitude="form.longitude"
            ></zones-point>
        </v-card>

      </v-col>

    </v-row>
  </v-form>
</template>

<script>

import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
import AddressAutocomplete from "@/modules/maps/components/AddressAutocomplete/AddressAutocomplete";
import LocationMap from "@/modules/maps/components/LocationMap/LocationMap";
import StreetViewImage from "@/modules/maps/components/StreetViewImage/StreetViewImage";
import ZonesPoint from "@/modules/maps/components/ZonesPoint/ZonesPoint";


export default {
  name: "LocationForm",
  components: {ZonesPoint, StreetViewImage, LocationMap, AddressAutocomplete},
  mixins: [InputErrorsByProps, RequiredRule],

  props: {
    value: {type: Object, required: true},

    addressSmCol: {type: Number, default: 6},
    apartmentSmCol: {type: Number, default: 3},
    floorSmCol: {type: Number, default: 3},
    mapSmCol: {type: Number, default: 6},

    enableCoordinates: {type: Boolean, default: false},
    enableCountry: {type: Boolean, default: false},
    enableLocality: {type: Boolean, default: false},
    enableProvince: {type: Boolean, default: false},
    enablePostalCode: {type: Boolean, default: false},
    enableMap: {type: Boolean, default: false},
    mapHeight: {type: String, default: '300px'},
    enableStreetView: {type: Boolean, default: false},
    enableZone: {type: Boolean, default: false},
  },
  computed: {
    form: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    form: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    }

  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>

