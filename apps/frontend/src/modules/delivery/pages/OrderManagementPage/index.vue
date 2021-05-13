<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <order-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import OrderCrud from "./OrderCrud";
    export default {
        name: "Order",
        components: {OrderCrud}
    }
</script>

<style scoped>

</style>

