<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <zone-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ZoneCrud from "./ZoneCrud";
    export default {
        name: "Zone",
        components: {ZoneCrud}
    }
</script>

<style scoped>

</style>

