<template>
 <v-row row wrap>

    <v-col cols="12" sm="6" md="4" offset-md="8" offset-sm="6">
        <search-input  @search="performSearch" v-model="search" />
    </v-col>

    <v-col cols="12">

       <v-data-table
                class="mt-3"
                :headers="headers"
                :items="items"
                :search="search"
                :single-expand="false"
                :server-items-length="totalItems"
                :loading="loading"
                :page.sync="pageNumber"
                :items-per-page.sync="itemsPerPage"
                :sort-by.sync="orderBy"
                :sort-desc.sync="orderDesc"
                :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
                @update:page="fetch"
                @update:sort-by="fetch"
                @update:sort-desc="fetch"
                @update:items-per-page="fetch"
        >

            
            
            
            
            <template slot="no-data">
               <div class="text-xs-center" v-t="'common.noData'"></div>
            </template>

            <template slot="loading">
               <div   class="text-xs-center" v-t="'common.loading'"></div>
            </template>

            <template v-slot:item.action="{ item }">
                <show-button  @click="$emit('show', item)" />
                <edit-button  @click="$emit('update', item)" />
                <delete-button @click="$emit('delete', item)" />
            </template>

        </v-data-table>
    </v-col>
</v-row>
</template>

<script>
   import IngredientProvider from "../../../providers/IngredientProvider";
   
   import {DeleteButton, EditButton, ShowButton, SearchInput} from "@dracul/common-frontend"
    
   
    export default {
        name: "IngredientList",
        components: {DeleteButton, EditButton, ShowButton, SearchInput},
        
        data() {
            return {
                items: [],
                totalItems: null,
                loading: false,
                orderBy: null,
                orderDesc: false,
                itemsPerPage: 5,
                pageNumber: 1,
                search: ''
            }
        },
        computed: {   
          headers () {
            return [
                    //Entity Headers
                    {text: this.$t('delivery.ingredient.labels.name'), value: 'name'},
                    //Actions
                    {text: this.$t('common.actions'), value: 'action', sortable: false},
                ]
          },
          getOrderBy(){
              return  (Array.isArray(this.orderBy)) ? this.orderBy[0]: this.orderBy
          },
          getOrderDesc(){
              return  (Array.isArray(this.orderDesc)) ? this.orderDesc[0]: this.orderDesc
          } 
        },
        created() {
            this.fetch()
        },
        methods:{
            performSearch(){
                this.pageNumber = 1
                this.fetch()
            },
            fetch() {
                this.loading = true
                IngredientProvider.paginateIngredients(
                    this.pageNumber, 
                    this.itemsPerPage,
                    this.search,
                    this.getOrderBy, 
                    this.getOrderDesc
                ).then(r => {
                    this.items = r.data.ingredientPaginate.items
                    this.totalItems = r.data.ingredientPaginate.totalItems
                }).catch(err => {
                    console.error(err)
                }).finally(() => this.loading = false)
            }
        }
        
    }
</script>


