<template>
    <v-form ref="form" autocomplete="off" @submit.prevent="save" >
        <v-row>

                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="badge"
                                name="name"
                                v-model="form.name"
                                :label="$t('delivery.order.labels.name')"
                                :placeholder="$t('delivery.order.labels.name')"
                                :error="hasInputErrors('name')"
                                :error-messages="getInputErrors('name')"
                                color="secondary"

                        ></v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="phone"
                                name="phone"
                                v-model="form.phone"
                                :label="$t('delivery.order.labels.phone')"
                                :placeholder="$t('delivery.order.labels.phone')"
                                :error="hasInputErrors('phone')"
                                :error-messages="getInputErrors('phone')"
                                color="secondary"
                                :rules="required"
                        ></v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="email"
                                name="email"
                                v-model="form.email"
                                :label="$t('delivery.order.labels.email')"
                                :placeholder="$t('delivery.order.labels.email')"
                                :error="hasInputErrors('email')"
                                :error-messages="getInputErrors('email')"
                                color="secondary"

                        ></v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="location_on"
                                name="address"
                                v-model="form.address"
                                :label="$t('delivery.order.labels.address')"
                                :placeholder="$t('delivery.order.labels.address')"
                                :error="hasInputErrors('address')"
                                :error-messages="getInputErrors('address')"
                                color="secondary"

                        ></v-text-field>
                    </v-col>


                   <v-col cols="12" sm="6">
                        <state-combobox v-model="form.state" :input-errors="inputErrors" />
                   </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field

                                prepend-icon="tag"
                                name="number"
                                v-model.number="form.number"
                                type="number"
                                :label="$t('delivery.order.labels.number')"
                                :placeholder="$t('delivery.order.labels.number')"
                                :error="hasInputErrors('number')"
                                :error-messages="getInputErrors('number')"
                                color="secondary"

                        ></v-text-field>
                    </v-col>

        </v-row>
    </v-form>
</template>

<script>

    import {InputErrorsByProps, RequiredRule } from '@dracul/common-frontend'

    import StateCombobox from "./StateCombobox";

    export default {
        name: "OrderForm",
        mixins: [InputErrorsByProps, RequiredRule    ],
        components: {StateCombobox,},
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

