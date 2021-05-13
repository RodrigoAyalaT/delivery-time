<template>
  <v-autocomplete
      prepend-icon="account_box"
      v-model="model"
      :items="items"
      name="asd"
      :search-input.sync="search"
      :label="label"
      :placeholder="placeholder"
      class="pa-3"
      autocomplete="off"
      :loading="loading"
      :filter="d=>d"
      color="secondary"
      item-color="secondary"
      return-object
      @change="change"
      :rules="required"
  >
    <template v-slot:append>
      <v-tooltip
          bottom
      >
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">
            mdi-exclamation-thick
          </v-icon>
        </template>
        {{ $t('people.person.mandatoryText') }}
      </v-tooltip>
    </template>
  </v-autocomplete>
</template>
<script>
import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
import debounce from 'lodash.debounce';
import GoogleProvider from "@/modules/maps/providers/GoogleProvider";

export default {
  name: 'addressAutocomplete',
  mixins: [InputErrorsByProps, RequiredRule],
  props: {
    type: Object,
    value: String
  },
  data() {
    return {
      label: this.$t('maps.location.labels.address'),
      placeholder: this.$t('maps.location.labels.address'),
      items: [this.value],
      loading: false,
      search: this.value,
      model: this.value,
      debounceVar: null
    }
  },

  watch: {
    search: function (val) {
      if (val != "") {
        this.debounceVar(val)
      } else {
        this.model = null
        this.debounceVar.cancel()
        this.items = []
        this.clearFields()
      }
    }
  },
  created() {
    this.debounceVar = debounce(
        this.searchGeo2, 1000)
  },
  methods: {
    change(item) {
      if (item.value) {
        this.$emit('input', item.value.address)
        this.$emit('lat', item.value.lat)
        this.$emit('lng', item.value.lng)
        this.$emit('country', item.value.country)
        this.$emit('postalCode', item.value.postalCode)
        this.$emit('province', item.value.province)
        this.$emit('locality', item.value.locality)

      }
    },
    clearFields() {
      this.$emit('input', null)
      this.$emit('lat', null)
      this.$emit('lng', null)
      this.$emit('country', null)
      this.$emit('postalCode', null)
      this.$emit('province', null)
      this.$emit('locality', null)
    },
    searchGeo2(val) {
      this.loading = true
      GoogleProvider.googleGeocode(val).then(response => {
        this.items = response.data.googleGeocode.map(i => {

          let country = ''
          let postalCode = ''
          let province = ''
          let locality = ''

          if (i.address_components.length > 0) {
            country = i.address_components.find(a => a.types.includes('country'))
            country = country ? country.long_name : ""

            postalCode = i.address_components.find(a => a.types.includes('postal_code'))
            postalCode = postalCode ? postalCode.long_name : ""

            province = i.address_components.find(a => a.types.includes('administrative_area_level_1'))

            if (province && province.short_name === "CABA") {
              province = province.short_name
            } else {
              province = province ? province.long_name : ""
            }

            locality = i.address_components.find(a => a.types.includes('sublocality'))
            if (locality) {
              locality = locality ? locality.long_name : ""
            } else {
              locality = i.address_components.find(a => a.types.includes('locality'))
              locality = locality ? locality.long_name : ""
            }

          }

          return {
            text: i.formatted_address,
            value: {
              country: country,
              postalCode: postalCode,
              province: province,
              locality: locality,
              address: i.formatted_address,
              lat: i.geometry.location.lat,
              lng: i.geometry.location.lng
            }
          }
        })
      }).catch(err => {
        console.error(err)
      }).finally(() => this.loading = false)
    }

  },
}
</script>
