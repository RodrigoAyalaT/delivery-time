<template>
  <v-btn
      @click="confirmOrder"
      :disabled="!$store.getters.orderIsReady"
      color="green white--text"
      x-large
      :loading="loading"
  >
              <span class="font-weight-bold"
              >{{ $t('delivery.orderConfirm') }} </span>
  </v-btn>
</template>

<script>
export default {
  name: "OrderConfirmation",
  data(){
    return {
      loading: false
    }
  },
  methods: {
    confirmOrder() {
      this.loading = true
      this.$store.dispatch('createOrder')
          .then((orderIdentifier) => {
            this.$emit('orderCreated',orderIdentifier)
          })
          .catch(e => {
            console.error("OrderConfirmation Error", e)
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>

<style scoped>

</style>
