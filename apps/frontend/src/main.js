import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import i18n from './i18n'
import router from "./router";
import 'animate.css/animate.min.css'
import './assets/css/main.css'
import checkView from 'vue-check-view'
Vue.use(checkView)

import apolloClient from './apollo'
import {setGraphQlClientToProviders} from '@dracul/user-frontend'
import {UploadProvider, FileProvider} from '@dracul/media-frontend'

import {customizationProvider} from '@dracul/customize-frontend'
import {notificationProvider} from '@dracul/notification-frontend'
import {SettingsProvider} from "@dracul/settings-frontend";

setGraphQlClientToProviders(apolloClient)
customizationProvider.setGqlc(apolloClient)
notificationProvider.setGqlc(apolloClient)
notificationProvider.setGqlcWs(apolloClient)
UploadProvider.setGqlc(apolloClient)
FileProvider.setGqlc(apolloClient)

Vue.config.productionTip = false

//Customization instances inject
store.commit('setVuetifyInstance', vuetify)

//1. Load from localstore
i18n.locale = store.state.customization.language
//2. Load from backend
store.dispatch('loadCustomizations')
     .then(r => {
         i18n.locale = r.language
     })

//LoadSettings
SettingsProvider.setGqlc(apolloClient)
store.dispatch('loadSettings')

new Vue({
    vuetify,
    store,
    i18n,
    router,
    render: h => h(App)
}).$mount('#app')
