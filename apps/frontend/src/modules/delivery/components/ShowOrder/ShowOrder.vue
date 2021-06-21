<template>
  <v-row v-if="$store.getters.isSettingsReady && order" align="stretch" justify="center">

    <v-col cols="12" sm="6" md="8">
      <h3 class="text-h4 text-center">{{ $t('delivery.orderView', {identifier}) }}</h3>
    </v-col>

    <template v-if="loading">
      <v-col cols="12" sm="6" md="8">
        <loading></loading>
      </v-col>
    </template>

    <template v-else>

      <v-col cols="12" sm="10" md="8">
        <show-order-state :state="order.state"/>
      </v-col>

      <v-col cols="12" sm="10" md="8">

        <show-order-items
            :items="order.items"
        />

      </v-col>

      <v-col cols="12" sm="10" md="8">
        <v-row>
          <v-col cols="12" md="12">
            <show-order-contact
                :name="order.contact.name"
                :email="order.contact.email"
                :phone="order.contact.phone"
                :observation="order.contact.observation"
            />
          </v-col>
          <v-col cols="12" md="12">
            <show-order-location
                :delivery-mode="order.delivery.mode"
                :time="order.delivery.time"
                :location="order.location"
            />
          </v-col>

        </v-row>
      </v-col>



      <v-col cols="12" sm="10" md="8">
        <show-order-total
            :quantity="order.totalQuantity"
            :total="order.totalAmount"
        />
      </v-col>

    </template>
  </v-row>
</template>

<script>
import ShowOrderContact from "@/modules/delivery/components/ShowOrderContact/ShowOrderContact";
import ShowOrderLocation from "@/modules/delivery/components/ShowOrderLocation/ShowOrderLocation";
import ShowOrderTotal from "@/modules/delivery/components/ShowOrderTotal/ShowOrderTotal";
import ShowOrderItems from "@/modules/delivery/components/ShowOrderItems/ShowOrderItems";
import OrderProvider from "@/modules/delivery/providers/OrderProvider";
import {Loading} from "@dracul/common-frontend"
import ShowOrderState from "@/modules/delivery/components/ShowOrderState/ShowOrderState";

export default {
  name: "ShowOrder",
  components: {
    ShowOrderState,
    Loading,
    ShowOrderItems,
    ShowOrderTotal,
    ShowOrderLocation,
    ShowOrderContact
  },
  props: {
    identifier: {type: String, required: true},
  },
  data() {
    return {
      order: null,
      loading: false,
      timeout: null
    }
  },
  mounted() {
    this.fetchOrder()
    this.refreshOrder()
  },
  destroyed() {
    clearTimeout(this.timeout)
  },
  methods: {
    refreshOrder() {

      this.timeout = setTimeout(() => {
        this.fetchOrder()
            .then(() => {
              if (this.order.state != 'DELIVERED') {
                this.refreshOrder()
              }
            })
      }, 30000)

    },
    fetchOrder() {
      return new Promise((resolve, reject) => {

        if (this.identifier) {
          this.loading = true
          OrderProvider.findOrderByIdentifier(this.identifier)
              .then(r => {
                this.order = r.data.orderFindByIdentifier
                resolve(this.order)
              })
              .catch(e => {
                console.error(e)
                reject(e)
              })
              .finally(() => this.loading = false)
        } else {
          resolve()
        }

      })

    }
  }

}
</script>

<style scoped>

</style>
