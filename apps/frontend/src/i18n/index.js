import Vue from "vue";
import VueI18n from 'vue-i18n'
import merge from 'deepmerge'

import baseMessages from '../modules/base/i18n/messages'
import deliveryMessages from '../modules/delivery/i18n/messages'
import mapsMessages from '../modules/maps/i18n/messages'
import calendarMessages from '../modules/calendar/i18n/messages'
import paymentMessages from '../modules/payment/i18n/messages'
import menuMessages from '../menu-config/menu-i18n'
import {i18nMessages as i18nMessagesCommon} from '@dracul/common-frontend'
import {i18nMessages as i18nMessagesSettings} from '@dracul/settings-frontend'
import {i18nMessages as i18nMessagesUser} from '@dracul/user-frontend'
import {i18nMessages as i18nMessagesCustom} from '@dracul/customize-frontend'
import {i18nMessages as i18nMessagesNotification} from '@dracul/notification-frontend'

const messages = merge.all([
    baseMessages,
    i18nMessagesSettings,
    deliveryMessages,
    paymentMessages,
    mapsMessages,
    calendarMessages,
    menuMessages,
    i18nMessagesCommon,
    i18nMessagesUser,
    i18nMessagesCustom,
    i18nMessagesNotification
])

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'en',
    messages,
})

export default i18n
