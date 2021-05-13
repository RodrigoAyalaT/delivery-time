<template>
        <crud-update :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @update="update"
                 @close="$emit('close')"
    >
         <location-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-update>
</template>

<script>

    import LocationProvider from "../../../providers/LocationProvider";
    
    import {CrudUpdate, ClientError} from '@dracul/common-frontend'
    
    import LocationForm from "../LocationForm";
  
    

    export default {
        name: "LocationUpdate",
        
        components: { LocationForm, CrudUpdate },
        
        props:{
          open: {type: Boolean, default: true},
          item: {type: Object, required: true}
        },

        data() {
            return {
                title: 'maps.location.editing',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                     id: this.item.id,
                    address: this.item.address,
                    floor: this.item.floor,
                    apartment: this.item.apartment,
                    latitude: this.item.latitude,
                    longitude: this.item.longitude,
                    country: this.item.country,
                    province: this.item.province,
                    locality: this.item.locality,
                    postalCode: this.item.postalCode
                }
            }
        },
        methods: {
            update() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    LocationProvider.updateLocation(this.form).then(r => {
                            if (r) {
                                this.$emit('itemUpdated',r.data.locationUpdate)
                                this.$emit('close')
                            }
                        }
                    ).catch(error => {
                         let clientError = new ClientError(error)
                         this.inputErrors = clientError.inputErrors
                         this.errorMessage = clientError.i18nMessage
                    }).finally(() => this.loading = false)
                }

            }
        },
    }
</script>

<style scoped>

</style>

