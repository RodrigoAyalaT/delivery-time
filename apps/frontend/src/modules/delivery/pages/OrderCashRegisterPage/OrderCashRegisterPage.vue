<template>
  <v-container>
    <h3>Arqueo de caja</h3>

    <v-row dense>
      <v-col cols="12" md="4">
        <date-input v-model="date" @input="fetch"></date-input>
      </v-col>

      <v-col cols="12" md="4">
        <payment-methods-combobox v-model="method"/>
      </v-col>

    </v-row>

    <loading v-if="loading"></loading>

    <v-row v-if="data">


      <v-col v-for="(item,index) in getData" :key="index" cols="12" md="4">
        <v-card>
          <v-card-text>
            <v-simple-table dense>
              <tbody>
              <tr>
                <th>Entrega</th>
                <td>{{ item.deliveryMode }}</td>
              </tr>

              <tr>
                <th>Pago</th>
                <td>{{ item.paymentMethod }}</td>
              </tr>

              <tr>
                <th>Repartidor</th>
                <td>{{ item.deliveryUsername }}</td>
              </tr>

              <tr>
                <th>Cantidad de Ordenes</th>
                <td>{{ item.count }}</td>
              </tr>

              <tr>
                <th>Monto cobrado</th>
                <td>${{ item.amount }}</td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderProvider from "@/modules/delivery/providers/OrderProvider";
import {DateInput} from "@dracul/dayjs-frontend"
import {Loading} from "@dracul/common-frontend"
import PaymentMethodsCombobox from "@/modules/payment/components/PaymentMethodCombobox/PaymentMethodCombobox";

export default {
  name: "OrderCashRegisterPage",
  components: {PaymentMethodsCombobox, DateInput, Loading},
  data() {
    return {
      loading: false,
      data: null,
      method: null,
      date: null,
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    getData() {
      return this.data.filter(e => this.method ? e.paymentMethod === this.method : true)
    }
  },
  methods: {
    fetch() {
      this.loading = true
      OrderProvider.orderCashReport(this.date)
          .then(r => {
            this.data = r.data.orderCashReport
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>

<style scoped>

</style>
