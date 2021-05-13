<template>
    <crud-create :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @create="create"
                 @close="$emit('close')"
    >
        <order-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-create>
</template>

<script>

    import OrderProvider from "../../../providers/OrderProvider";
    
    import {CrudCreate, ClientError} from '@dracul/common-frontend'
    
    import OrderForm from "../OrderForm";
    
    


    export default {
        name: "OrderCreate",
         
        components: { OrderForm, CrudCreate },
        
        props:{
          open: {type: Boolean, default: true}
        },
        
        data() {
            return {
                title: 'delivery.order.creating',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    state: '',
                    number: null
                }
            }
        },
        
        methods: {
            create() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    OrderProvider.createOrder(this.form).then(r => {
                            if (r) {
                                this.$emit('itemCreated',r.data.orderCreate)
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

