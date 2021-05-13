<template>
        <crud-update :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @update="update"
                 @close="$emit('close')"
    >
         <product-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-update>
</template>

<script>

    import ProductProvider from "../../../providers/ProductProvider";
    
    import {CrudUpdate, ClientError} from '@dracul/common-frontend'
    
    import ProductForm from "../ProductForm";
  
    

    export default {
        name: "ProductUpdate",
        
        components: { ProductForm, CrudUpdate },
        
        props:{
          open: {type: Boolean, default: true},
          item: {type: Object, required: true}
        },

        data() {
            return {
                title: 'delivery.product.editing',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                     id: this.item.id,
                    name: this.item.name,
                    description: this.item.description,
                    image: this.item.image,
                    price: this.item.price,
                    stock: this.item.stock,
                    active: this.item.active
                }
            }
        },
        methods: {
            update() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    ProductProvider.updateProduct(this.form).then(r => {
                            if (r) {
                                this.$emit('itemUpdated',r.data.productUpdate)
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

