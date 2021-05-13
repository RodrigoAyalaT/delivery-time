<template>
<crud-layout :title="title" :subtitle="subtitle">

        <template v-slot:list>
            <zone-list 
                       ref="list"
                       @update="update"
                       @delete="remove"
                       @show="show"
            
            />
        </template>
        
         <add-button @click="create"></add-button>
      
        <zone-create v-if="creating" 
                        :open="creating"
                        v-on:itemCreated="onItemCreated" 
                        v-on:close="creating=false" 
        />
        
        <zone-update v-if="updating" 
                        :open="updating"
                        :item="itemToEdit" 
                        v-on:itemUpdated="onItemUpdated" 
                        v-on:close="updating=false" 
        />
          
        <zone-show v-if="showing" 
                           :open="showing" 
                           :item="itemToShow"  
                           v-on:close="showing=false" 
         />

        <zone-delete v-if="deleting" 
                         :open="deleting"
                         :item="itemToDelete"  
                         v-on:itemDeleted="onItemDeleted" 
                         v-on:close="deleting=false" 
        />

        <snackbar v-model="flash"/>

</crud-layout>
</template>

<script>
    
    import ZoneCreate from "../ZoneCreate";
    import ZoneUpdate from "../ZoneUpdate";
    import ZoneDelete from "../ZoneDelete";
    import ZoneShow from "../ZoneShow";
    import ZoneList from "../ZoneList";
    
     import {CrudLayout, AddButton, Snackbar} from "@dracul/common-frontend"
     
    export default {
        name: "ZoneCrud",
        components: {
            CrudLayout, AddButton, Snackbar,
            ZoneCreate, 
            ZoneUpdate, 
            ZoneDelete, 
            ZoneShow,
            ZoneList
        },
        data() {
            return {
                title: 'maps.zone.title',
                subtitle: 'maps.zone.subtitle',
                flash: null,
                creating: false,
                updating: false,
                deleting: false,
                showing: false,
                itemToEdit: null,
                itemToDelete: null,
                itemToShow: null,
            }
        },
        methods: {
            //On
            onItemCreated() {
                this.$refs.list.fetch()
                this.flash= "common.created"
            },
            onItemUpdated() {
                this.$refs.list.fetch()
                this.flash= "common.updated"
            },
            onItemDeleted() {
                this.$refs.list.fetch()
                this.flash= "common.deleted"
            },
            //Open
            create() {
                this.creating = true
            },
            update(item) {
                this.updating = true
                this.itemToEdit = item
            },
            show(item) {
                this.showing = true
                this.itemToShow = item
            },
            remove(item) {
                this.deleting = true
                this.itemToDelete = item
            }
        }
        
    }
</script>


