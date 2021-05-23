<template>
    <crud-create :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @create="create"
                 @close="$emit('close')"
    >
        <product-category-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-create>
</template>

<script>

    import ProductCategoryProvider from "../../../providers/ProductCategoryProvider";
    
    import {CrudCreate, ClientError} from '@dracul/common-frontend'
    
    import ProductCategoryForm from "../ProductCategoryForm";
    
    


    export default {
        name: "ProductCategoryCreate",
         
        components: { ProductCategoryForm, CrudCreate },
        
        props:{
          open: {type: Boolean, default: true}
        },
        
        data() {
            return {
                title: 'delivery.productCategory.creating',
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
                    ProductCategoryProvider.createProductCategory(this.form).then(r => {
                            if (r) {
                                this.$emit('itemCreated',r.data.productCategoryCreate)
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

