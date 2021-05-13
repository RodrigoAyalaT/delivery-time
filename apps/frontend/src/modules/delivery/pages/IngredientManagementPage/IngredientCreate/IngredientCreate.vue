<template>
    <crud-create :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @create="create"
                 @close="$emit('close')"
    >
        <ingredient-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-create>
</template>

<script>

    import IngredientProvider from "../../../providers/IngredientProvider";
    
    import {CrudCreate, ClientError} from '@dracul/common-frontend'
    
    import IngredientForm from "../IngredientForm";
    
    


    export default {
        name: "IngredientCreate",
         
        components: { IngredientForm, CrudCreate },
        
        props:{
          open: {type: Boolean, default: true}
        },
        
        data() {
            return {
                title: 'delivery.ingredient.creating',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                    name: ''
                }
            }
        },
        
        methods: {
            create() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    IngredientProvider.createIngredient(this.form).then(r => {
                            if (r) {
                                this.$emit('itemCreated',r.data.ingredientCreate)
                                this.$emit('close')
                            }
                        }
                    ).catch(error => {
                         let clientError = new ClientError(error)
                         this.inputErrors = clientError.inputErrors
                         this.errorMessage = clientError.i18nMessage
                    }).finally(() => this.loading = false)
                }

            }

        },
    }
</script>

<style scoped>

</style>

