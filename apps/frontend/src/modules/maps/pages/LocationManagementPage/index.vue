<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <location-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import LocationCrud from "./LocationCrud";
    export default {
        name: "Location",
        components: {LocationCrud}
    }
</script>

<style scoped>

</style>

