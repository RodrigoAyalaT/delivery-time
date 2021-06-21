<template>
  <v-container v-if="getOrderIdentifier" fluid class="grey lighten-4">
    <show-order :identifier="getOrderIdentifier"></show-order>

  </v-container>
</template>

<script>
import ShowOrder from "@/modules/delivery/components/ShowOrder/ShowOrder";
export default {
  name: "CurrentOrderPage",
  components: {ShowOrder},
  computed: {
    getOrderIdentifier() {
      return this.$route.params.identifier
    }
  }
}
</script>

<style scoped>

</style>
