<template>
    <v-form ref="form" autocomplete="off" @submit.prevent="save" >
        <v-row>

                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="takeout_dining"
                                name="name"
                                v-model="form.name"
                                :label="$t('delivery.product.labels.name')"
                                :placeholder="$t('delivery.product.labels.name')"
                                :error="hasInputErrors('name')"
                                :error-messages="getInputErrors('name')"
                                color="secondary"
                                :rules="required"
                        ></v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="description"
                                name="description"
                                v-model="form.description"
                                :label="$t('delivery.product.labels.description')"
                                :placeholder="$t('delivery.product.labels.description')"
                                :error="hasInputErrors('description')"
                                :error-messages="getInputErrors('description')"
                                color="secondary"

                        ></v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="photo_camera"
                                name="image"
                                v-model="form.image"
                                :label="$t('delivery.product.labels.image')"
                                :placeholder="$t('delivery.product.labels.image')"
                                :error="hasInputErrors('image')"
                                :error-messages="getInputErrors('image')"
                                color="secondary"

                        ></v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="price_change"
                                name="price"
                                v-model.number="form.price"
                                type="number"
                                :label="$t('delivery.product.labels.price')"
                                :placeholder="$t('delivery.product.labels.price')"
                                :error="hasInputErrors('price')"
                                :error-messages="getInputErrors('price')"
                                color="secondary"
                                :rules="required"
                        ></v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="inventory_2"
                                name="stock"
                                v-model.number="form.stock"
                                type="number"
                                :label="$t('delivery.product.labels.stock')"
                                :placeholder="$t('delivery.product.labels.stock')"
                                :error="hasInputErrors('stock')"
                                :error-messages="getInputErrors('stock')"
                                color="secondary"

                        ></v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-checkbox
                                prepend-icon="toggle_on"
                                name="active"
                                v-model="form.active"
                                :label="$t('delivery.product.labels.active')"
                                :error="hasInputErrors('active')"
                                :error-messages="getInputErrors('active')"
                                color="secondary"

                        ></v-checkbox>
                    </v-col>


                   <v-col cols="12" sm="6">
                        <ingredient-combobox v-model="form.ingredients" :input-errors="inputErrors" />
                   </v-col>


                   <v-col cols="12" sm="6">
                        <product-category-combobox v-model="form.category" :input-errors="inputErrors" />
                   </v-col>

        </v-row>
    </v-form>
</template>

<script>

    import {InputErrorsByProps, RequiredRule } from '@dracul/common-frontend'

    import IngredientCombobox from "./IngredientCombobox";
import ProductCategoryCombobox from "../../../components/ProductCategoryCombobox/ProductCategoryCombobox";





    export default {
        name: "ProductForm",
        mixins: [InputErrorsByProps, RequiredRule    ],
        components: {IngredientCombobox,
ProductCategoryCombobox,},
        props:{
            value: {
                type: Object,
                required: true
            },
        },
        computed: {
           form: {
                get() { return this.value },
                set(val) {this.$emit('input', val)}
            }
        },
         watch: {
            form: {
                handler(newVal) {
                    this.$emit('input', newVal)
                },
                deep: true
            }
        },
        methods: {
            validate(){
              return this.$refs.form.validate()
            }
        },
        data(){
            return {

            }
        }
    }
</script>

<style scoped>

</style>

