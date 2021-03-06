import Vue from 'vue'
import Vuex from 'vuex'

import {UserModuleStore} from '@dracul/user-frontend'
import {CustomizationStore} from '@dracul/customize-frontend'
import {SettingsModuleStore} from '@dracul/settings-frontend'

import BaseModuleStore from '../modules/base/storage/BaseModuleStore'
import DeliveryModuleStore from '../modules/delivery/store'
import PaymentModuleStore from '../modules/payment/store'

Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
    state: {
        extensionMenu: []
    },
    mutations: {
        setExtensionMenu(state, val) {
            state.extensionMenu = val
        }
    },
    modules: {
        settings: SettingsModuleStore,
        user: UserModuleStore,
        base: BaseModuleStore,
        delivery: DeliveryModuleStore,
        payment: PaymentModuleStore,
        customization: CustomizationStore
    },
    plugins: [
        createPersistedState({
            key: process.env.VUE_APP_KEY,
            paths: ['user'],
            reducer: state => (
                {
                    user: {
                        access_token: state.user.access_token,
                        me: state.user.me,
                        avatarurl: state.user.avatarurl
                    },
                    customization: {
                        colors: state.customization.colors,
                        logo: state.customization.logo,
                        language: state.customization.language
                    },
                    delivery: {
                        galleryView: state.delivery.galleryView,
                        order: state.delivery.order,
                        currentOrderIdentifier: state.delivery.currentOrderIdentifier,
                        orderHistory: state.delivery.orderHistory,
                        lastLocation: state.delivery.lastLocation,
                        locationHistory: state.delivery.locationHistory
                    }
                })
        })
    ]
})
