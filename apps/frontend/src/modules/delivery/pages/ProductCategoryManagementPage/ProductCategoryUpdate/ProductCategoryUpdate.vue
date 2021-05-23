<template>
        <crud-update :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @update="update"
                 @close="$emit('close')"
    >
         <product-category-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-update>
</template>

<script>

    import ProductCategoryProvider from "../../../providers/ProductCategoryProvider";
    
    import {CrudUpdate, ClientError} from '@dracul/common-frontend'
    
    import ProductCategoryForm from "../ProductCategoryForm";
  
    

    export default {
        name: "ProductCategoryUpdate",
        
        components: { ProductCategoryForm, CrudUpdate },
        
        props:{
          open: {type: Boolean, default: true},
          item: {type: Object, required: true}
        },

        data() {
            return {
                title: 'delivery.productCategory.editing',
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
                    ProductCategoryProvider.updateProductCategory(this.form).then(r => {
                            if (r) {
                                this.$emit('itemUpdated',r.data.productCategoryUpdate)
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

