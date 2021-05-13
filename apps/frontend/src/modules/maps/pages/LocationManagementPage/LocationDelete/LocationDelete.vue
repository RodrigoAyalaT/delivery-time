<template>
      <crud-delete :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @delete="remove"
                 @close="$emit('close')"
    >

        <v-card-text>
          <location-show-data :item="item" />
        </v-card-text>

        <v-card-text>
            <v-row justify="center">
                <span class="title">{{areYouSure}}</span>
            </v-row>
        </v-card-text>

    </crud-delete>
</template>

<script>
    //Provider  
    import LocationProvider from "../../../providers/LocationProvider";
    
    //Show Data
    import LocationShowData from "../LocationShow/LocationShowData";
    
    //Common
    import {CrudDelete, ClientError} from '@dracul/common-frontend'
    
    export default {
        name: "LocationDelete",
        
        components: {LocationShowData, CrudDelete},
        
        props: {
          open: {type: Boolean, default: true},
          item: {type: Object, required: true}
        },
        
        data() {
            return {
                modal: false,
                title: 'maps.location.deleting',
                areYouSure: this.$t('common.areYouSureDeleteRecord'),
                errorMessage: '',
                loading: false,
            }
        },
        methods: {
            remove() {
                this.loading = true
                LocationProvider.deleteLocation(this.item.id).then(result => {
                            if (result.data.locationDelete.success) {
                                this.$emit('itemDeleted',result.data.locationDelete)
                                this.$emit('close')
                            }else{
                                this.errorMessage = 'Error on Delete'
                            }
                        }
                    ).catch(error =>{
                        let clientError = new ClientError(error)
                        this.errorMessage = clientError.showMessage
                }).finally(() => this.loading = false)
            },
        },
    }
</script>


