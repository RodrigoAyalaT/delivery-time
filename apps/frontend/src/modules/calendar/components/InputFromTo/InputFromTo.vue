<template>
  <div>

    <v-row v-for="(item,i) in items" :key="i">
      <v-col cols="5">
        <v-text-field
            prepend-icon="event"
            name="from"
            v-model="item.from"
            :label="$t('calendar.calendar.labels.from')"
            :placeholder="$t('calendar.calendar.labels.from')"
            color="secondary"
            :rules="hourFormat"
        ></v-text-field>
      </v-col>

      <v-col cols="5">
        <v-text-field
            prepend-icon="event"
            name="to"
            v-model="item.to"
            :label="$t('calendar.calendar.labels.to')"
            :placeholder="$t('calendar.calendar.labels.to')"
            color="secondary"
            :rules="toValidation(item.from)"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-btn large @click="remove(i)" icon>
          <v-icon>remove</v-icon>
        </v-btn>
      </v-col>

    </v-row>
    <v-btn large @click="add" icon>
      <v-icon>add</v-icon>
    </v-btn>
  </div>

</template>

<script>
export default {
  name: "InputFromTo",
  props: {
    value: {
      type: Array,
      required: true,
      validator: propValue => {
        propValue.forEach(i => {
          if (i.from === undefined && i.to === undefined) {
            return false
          }
        })
        return true
      }
    },
  },
  computed: {
    items: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    hourFormat() {
      return [
        (val) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val) || this.$t('calendar.validation.wrongHourFormat'),
      ];
    },
    toValidation() {
      return (from) => {
        return [
          (val) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val) || this.$t('calendar.validation.wrongHourFormat'),
          (val) => from <= val || this.$t('calendar.validation.mustBeGreaterThanFrom')
        ]
      }
    },
  },
  watch: {
    items: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  methods: {
    add() {
      this.items.push({from: '00:00', to: '00:00'})
    },
    remove(index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
