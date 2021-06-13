<template>

        <v-select


                prepend-icon="account_tree"
                :items="items"
                v-model="item"
                :label="$t('delivery.order.labels.state')"
                :loading="loading"
                :error="hasInputErrors('state')"
                :error-messages="getInputErrors('state')"
                color="secondary"
                item-color="secondary"

        ></v-select>

</template>

<script>

    import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'



    export default {
        name: "StateCombobox",
        mixins: [InputErrorsByProps, RequiredRule],
        props:{
            value: {
               type: [String, Array]
            },
        },
        data() {
            return {
                items: ['NEW','PREPARING','READY','ON_THE_WAY','DELIVERED'],
                loading: false
            }
        },
        computed: {
           item: {
                get() { return this.value },
                set(val) {this.$emit('input', val)}
            }
        },
        methods: {
            validate(){
              return this.$refs.form.validate()
            }
        }
    }
</script>

<style scoped>

</style>

