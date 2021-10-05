<template>
  <div>
    <v-btn v-on:click="pickFile"
           class="mx-3 primary onPrimary--text"
           :loading="loading"
    >
      <v-icon left>attach_file</v-icon>
      Adjuntar comprobante
    </v-btn>

    <input type="file"
           style="display: none"
           ref="file"
           :accept="accept"
           @change="onFilePicked"
    />

    <v-dialog v-if="dialog" v-model="dialog" max-width="800">
      <v-card>
        <toolbar-dialog :title="dialogTitle" @close="dialog=false"></toolbar-dialog>

        <v-card-text>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {UploadProvider} from "@dracul/media-frontend";
import {ClientError, ToolbarDialog} from '@dracul/common-frontend'

const INITIAL = 'initial'
const SELECTED = 'selected'
const UPLOADED = 'uploaded'
const ERROR = 'error'

export default {
  name: "UploadReceipt",
  components: {ToolbarDialog},
  props: {
    autoSubmit: {type: Boolean, default: false},
    accept: {type: String, default: '*'},
    xLarge: {type: Boolean, default: false},
  },
  data() {
    return {
      dialog: false,
      dialogTitle: null,
      title: 'media.file.creating',
      errorMessage: '',
      inputErrors: {},
      file: null,
      color: 'blue-grey',
      icon: 'cloud_upload',
      type: null,
      uploadedFile: null,
      state: INITIAL,
      states: {
        initial: {
          color: 'blue-grey',
          icon: 'cloud_upload'
        },
        selected: {
          color: 'cyan darken-3',
          icon: 'publish'
        },
        loading: {
          color: 'amber darken-3',
          icon: ''
        },
        uploaded: {
          color: 'green darken-3',
          icon: 'zoom_in'
        },
        error: {
          color: 'red darken-3',
          icon: 'error'
        }
      },
      loading: false,
    }
  },
  computed: {
    getState() {
      if (this.loading) return this.states.loading
      return this.states[this.state]
    },
    getSrc() {
      if (this.uploadedFile && this.uploadedFile.url) {
        return this.uploadedFile.url
      }
      return null
    }
  },
  methods: {
    pickFile() {
      if (this.state === INITIAL) {
        this.$refs.file.click()
      } else if (this.state === SELECTED) {
        this.upload()
      } else if (this.state === UPLOADED || this.state === ERROR) {
        this.dialog = true
      }
    },
    onFilePicked: function (e) {
      this.file = e.target.files[0]
      this.state = SELECTED
      if (this.autoSubmit) {
        this.upload()
      }
    },
    upload() {
      if (this.file && this.state != UPLOADED) {
        this.loading = true
        UploadProvider.uploadFile(this.file).then(result => {
          this.state = UPLOADED
          this.uploadedFile = result.data.fileUpload
          this.$emit('fileUploaded', result.data.fileUpload)
        }).catch(err => {
          this.state = ERROR
          let clientError = new ClientError(err)
          this.errorMessage = clientError.i18nMessage
        }).finally(() => this.loading = false)
      }
    }
  }
}
</script>

<style scoped>

</style>
