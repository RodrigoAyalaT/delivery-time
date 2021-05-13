<template>
        <crud-update :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @update="update"
                 @close="$emit('close')"
    >
         <ingredient-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-update>
</template>

<script>

    import IngredientProvider from "../../../providers/IngredientProvider";
    
    import {CrudUpdate, ClientError} from '@dracul/common-frontend'
    
    import IngredientForm from "../IngredientForm";
  
    

    export default {
        name: "IngredientUpdate",
        
        components: { IngredientForm, CrudUpdate },
        
        props:{
          open: {type: Boolean, default: true},
          item: {type: Object, required: true}
        },

        data() {
            return {
                title: 'delivery.ingredient.editing',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                     id: this.item.id,
                    name: this.item.name
                }
            }
        },
        methods: {
            update() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    IngredientProvider.updateIngredient(this.form).then(r => {
                            if (r) {
                                this.$emit('itemUpdated',r.data.ingredientUpdate)
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

