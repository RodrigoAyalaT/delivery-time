<template>
    <crud-create :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @create="create"
                 @close="$emit('close')"
    >
        <location-form
            ref="form"
            v-model="form"
            :input-errors="inputErrors"
            enable-coordinates
            enable-country
            enable-locality
            enable-map
            enable-postal-code
            enable-province
            enable-street-view
            enable-zone
        />
    </crud-create>
</template>

<script>

    import LocationProvider from "../../../providers/LocationProvider";

    import {CrudCreate, ClientError} from '@dracul/common-frontend'

    import LocationForm from "../../../components/LocationForm";




    export default {
        name: "LocationCreate",

        components: { LocationForm, CrudCreate },

        props:{
          open: {type: Boolean, default: true}
        },

        data() {
            return {
                title: 'maps.location.creating',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                    address: '',
                    floor: '',
                    apartment: '',
                    latitude: null,
                    longitude: null,
                    country: '',
                    province: '',
                    locality: '',
                    postalCode: ''
                }
            }
        },

        methods: {
            create() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    LocationProvider.createLocation(this.form).then(r => {
                            if (r) {
                                this.$emit('itemCreated',r.data.locationCreate)
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

