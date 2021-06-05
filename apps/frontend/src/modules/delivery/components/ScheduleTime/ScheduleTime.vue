<template>
  <v-select
      :items="getOptions"
      v-model="hour"
      :label="$t('Hour')"
  >

  </v-select>
</template>

<script>
export default {
  name: "ScheduleTime",
  data(){
    return {
      hour: null
    }
  },
  computed: {
    getOptions(){
      return [
          "19:00",
          "19:15",
          "19:30",
          "19:45",
          "20:00",
      ]
    }
  }
}
</script>

<style scoped>

</style>
