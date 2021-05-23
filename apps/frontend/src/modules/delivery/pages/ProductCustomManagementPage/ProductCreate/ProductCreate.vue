<template>
    <crud-create :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @create="create"
                 @close="$emit('close')"
    >
        <product-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-create>
</template>

<script>

    import ProductProvider from "../../../providers/ProductProvider";

    import {CrudCreate, ClientError} from '@dracul/common-frontend'

    import ProductForm from "../ProductForm";




    export default {
        name: "ProductCreate",

        components: { ProductForm, CrudCreate },

        props:{
          open: {type: Boolean, default: true}
        },

        data() {
            return {
                title: 'delivery.product.creating',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                    name: '',
                    description: '',
                    image: '',
                    price: null,
                    stock: null,
                    active: false,
                    ingredients: [],
                  category: null
                }
            }
        },

        methods: {
            create() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    ProductProvider.createProduct(this.form).then(r => {
                            if (r) {
                                this.$emit('itemCreated',r.data.productCreate)
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

