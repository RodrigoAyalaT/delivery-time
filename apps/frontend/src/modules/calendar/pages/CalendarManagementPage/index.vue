<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <calendar-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CalendarCrud from "./CalendarCrud";
    export default {
        name: "Calendar",
        components: {CalendarCrud}
    }
</script>

<style scoped>

</style>

