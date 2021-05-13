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


         <template v-slot:item.ingredients="{ item }">
            {{item.ingredients.map(e=> e.name).join(", ")}}
         </template>

         <template v-slot:item.image="{item}">
           <v-avatar tile>
             <v-img :src="item.image" />
           </v-avatar>
         </template>

         <template v-slot:item.price="{item}">
           ${{item.price}}
         </template>


         <template v-slot:item.active="{item}">
           <v-icon v-if="item.active" color="green">done</v-icon>
           <v-icon v-else color="red">cancel</v-icon>
         </template>


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
   import ProductProvider from "../../../providers/ProductProvider";

   import {DeleteButton, EditButton, ShowButton, SearchInput} from "@dracul/common-frontend"


    export default {
        name: "ProductList",
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
              {text: this.$t('delivery.product.labels.image'), value: 'image'},

              {text: this.$t('delivery.product.labels.name'), value: 'name'},
                    {text: this.$t('delivery.product.labels.price'), value: 'price'},
                    {text: this.$t('delivery.product.labels.stock'), value: 'stock'},
                    {text: this.$t('delivery.product.labels.active'), value: 'active'},
                    {text: this.$t('delivery.product.labels.ingredients'), value: 'ingredients'},
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
                ProductProvider.paginateProducts(
                    this.pageNumber,
                    this.itemsPerPage,
                    this.search,
                    this.getOrderBy,
                    this.getOrderDesc
                ).then(r => {
                    this.items = r.data.productPaginate.items
                    this.totalItems = r.data.productPaginate.totalItems
                }).catch(err => {
                    console.error(err)
                }).finally(() => this.loading = false)
            }
        }

    }
</script>


