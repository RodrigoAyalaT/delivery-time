<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6">
      <v-form ref="form">

        <v-row>

          <v-col cols="12">
            <h5 class="text-h5">Datos de contacto</h5>
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
                @keyup="stateSubmitButton"
            ></v-text-field>
          </v-col>


          <v-col cols="12">
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
                @keyup="stateSubmitButton"
            ></v-text-field>
          </v-col>


          <v-col cols="12">
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
                @keyup="stateSubmitButton"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
                dense
                rows="2"
                prepend-icon="description"
                name="observations"
                v-model="form.observations"
                :label="$t('delivery.order.labels.observations')"
                :placeholder="$t('delivery.order.labels.observations')"
                :error="hasInputErrors('observations')"
                :error-messages="getInputErrors('observations')"
                color="secondary"
            ></v-textarea>
          </v-col>

          <v-col cols="12" class="text-right">
            <submit-button
                text="common.next"
                @click="submitContact"
                :disabled="submitDisabled"
            ></submit-button>
          </v-col>

        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import {InputErrorsByProps, RequiredRule} from '@dracul/common-frontend'
import {SubmitButton} from "@dracul/common-frontend"

export default {
  name: "ContactForm",
  mixins: [InputErrorsByProps, RequiredRule],
  components: {SubmitButton},
  data() {
    return {
      submitDisabled: true,
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
        v => !!v || this.$t('user.validation.required'),
        v => /.+@.+/.test(v) || this.$t('user.validation.emailFormat')
      ]
    },
    phoneRules() {
      return [
        v => !!v || this.$t('user.validation.required'),
        v => /^[0-9]+$/i.test(v) || !v || this.$t('user.validation.number')
      ]
    },
  },
  mounted() {
    this.stateSubmitButton()
  },
  methods: {
    submitContact() {
      if (this.validate()) {
        this.$emit('next')
      }
    },
    stateSubmitButton() {
      if (this.validate()) {
        this.submitDisabled = false
      } else {
        this.submitDisabled = true
      }
    },
    validate() {
      return this.$refs.form.validate()
    }
  },
}
</script>

<style scoped>

</style>
