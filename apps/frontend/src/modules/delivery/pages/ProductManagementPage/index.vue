<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <product-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ProductCrud from "./ProductCrud";
    export default {
        name: "Product",
        components: {ProductCrud}
    }
</script>

<style scoped>

</style>

