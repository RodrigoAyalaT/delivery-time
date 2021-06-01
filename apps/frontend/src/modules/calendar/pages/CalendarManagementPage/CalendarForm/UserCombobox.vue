<template>

        <v-select
                
                
                prepend-icon="account_circle"
                :items="items"
                :item-text="'username'"
                :item-value="'id'"
                v-model="item"
                :label="$t('calendar.calendar.labels.user')"
                :loading="loading"
                :error="hasInputErrors('user')"
                :error-messages="getInputErrors('user')"
                color="secondary"
                item-color="secondary"
                
        ></v-select>

</template>

<script>

    import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
    
    
    import {userProvider} from "@dracul/user-frontend"

    export default {
        name: "UserCombobox",
        mixins: [InputErrorsByProps, RequiredRule],
        props:{
            value: {
               type: [String, Array]
            },
        },
        data() {
            return {
                items: [],
                loading: false
            }
        },
        computed: {
           item: {
                get() { return this.value },
                set(val) {this.$emit('input', val)}
            }
        },
        mounted() {
         this.fetch()
        },
        methods: {
            validate(){
              return this.$refs.form.validate()
            },
            fetch(){
               this.loading= true
              userProvider.users().then(r => {
                    this.items = r.data.users
                }).catch(err => console.error(err))
                .finally(()=> this.loading = false)
            }
            
        }
    }
</script>

<style scoped>

</style>

