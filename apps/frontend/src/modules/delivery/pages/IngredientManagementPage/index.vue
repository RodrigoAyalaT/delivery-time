<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <ingredient-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import IngredientCrud from "./IngredientCrud";
    export default {
        name: "Ingredient",
        components: {IngredientCrud}
    }
</script>

<style scoped>

</style>

