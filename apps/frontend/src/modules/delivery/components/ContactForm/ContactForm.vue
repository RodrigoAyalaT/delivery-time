<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row>

      <v-col v-if="!dense" cols="12" class="text-left">
        <h3 class="">¿Como te contactamos?</h3>
      </v-col>

      <v-col cols="12">
        <v-text-field
            dense
            prepend-icon="badge"
            name="name"
            v-model="form.name"
            :label="$t('delivery.order.labels.name')"
            :placeholder="$t('delivery.order.labels.name')"
            :error="hasInputErrors('name')"
            :error-messages="getInputErrors('name')"
            color="secondary"
            :rules="required"
            required class="required"
        ></v-text-field>
      </v-col>


      <v-col :cols="dense ? 6 : 12" >
        <v-text-field
            dense
            prepend-icon="phone"
            name="phone"
            v-model="form.phone"
            :label="$t('delivery.order.labels.phone')"
            :placeholder="$t('delivery.order.labels.phone')"
            :error="hasInputErrors('phone')"
            :error-messages="getInputErrors('phone')"
            color="secondary"
            :rules="phoneRules"
            required class="required"
        ></v-text-field>
      </v-col>


      <v-col :cols="dense ? 6 : 12" >
        <v-text-field
            dense
            prepend-icon="email"
            name="email"
            v-model="form.email"
            :label="$t('delivery.order.labels.email')"
            :placeholder="$t('delivery.order.labels.email')"
            :error="hasInputErrors('email')"
            :error-messages="getInputErrors('email')"
            color="secondary"
            :rules="emailRules"
            required :class="{'required':emailRequired}"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-textarea
            dense
            :rows="dense ? 1 : 2"
            prepend-icon="description"
            name="observations"
            v-model="form.observations"
            :label="$t('delivery.order.labels.observations')"
            :placeholder="$t('delivery.order.labels.observations')"
            :error="hasInputErrors('observations')"
            :error-messages="getInputErrors('observations')"
            color="secondary"
            hide-details
        ></v-textarea>
      </v-col>

      <v-col v-if="nextButton"
             cols="12"
             class="text-right"
      >
        <submit-button
            text="common.next"
            @click="submitContact"
            :disabled="!this.isValid"
        ></submit-button>
      </v-col>

    </v-row>
  </v-form>
</template>

<script>
import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
import {SubmitButton} from "@dracul/common-frontend"

export default {
  name: "ContactForm",
  mixins: [InputErrorsByProps, RequiredRule],
  components: {SubmitButton},
  props: {
    nextButton: {type: Boolean, default: false},
    dense: {type: Boolean, default: false},
    emailRequired: {type: Boolean, default: false},
  },
  data() {
    return {
      submitDisabled: true,
      valid: false
    }
  },
  computed: {
    form: {
      get() {
        return this.$store.getters.getOrderContact
      },
      set(val) {
        this.$store.commit('setOrderContact', val)
      }
    },
    emailRules() {
      return [
        v => (!this.emailRequired || !!v) || this.$t('user.validation.required'),
        v => (v.length === 0 || /.+@.+/.test(v)) || this.$t('user.validation.emailFormat')
      ]
    },
    phoneRules() {
      return [
        v => !!v || this.$t('user.validation.required'),
        v => /^[0-9]+$/i.test(v) || !v || this.$t('user.validation.number'),
        v => v.length >= 8 || !v || 'Minimo 8',
      ]
    },
    isValid() {
      return (this.valid && this.form.name != '' && (!this.emailRequired || this.form.email != '') && this.form.phone != '')
    }
  },
  methods: {
    submitContact() {
      if (this.isValid) {
        this.$emit('next')
      }
    },

  },
}
</script>

<style scoped>

</style>
