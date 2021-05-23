<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <product-category-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ProductCategoryCrud from "./ProductCategoryCrud";
    export default {
        name: "ProductCategory",
        components: {ProductCategoryCrud}
    }
</script>

<style scoped>

</style>

