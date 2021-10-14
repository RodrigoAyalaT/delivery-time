import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)

import {InitService} from '@dracul/user-backend'
import {
    InitMediaPermissions
} from '@dracul/media-backend'
import {initPermissionsCustomization} from '@dracul/customize-backend'
import {initCustomization} from './custom/initCustomization'
import {initSettings} from './custom/initSettings'
import {initCalendar} from './custom/initCalendar'
import {initPaymentMethods} from './custom/initPaymentMethods'
import repartidorRole from './custom/initRepartidorRole'
import mostradorRole from './custom/initMostradorRole'

import {
    permissions as notiPermissions
} from "@dracul/notification-backend"

import modulesPermissions from './custom/modulesPermissions'

import fixProductSoftDelete from "./custom/fixProductSoftDelete";

const initService = async () => {

    //SETTINGS
    await initSettings()

    //FIX fixProductSoftDelete
    await fixProductSoftDelete()

    //CALENDAR
    await initCalendar()

    //PaymentMethods
    await initPaymentMethods()

    //Default user Permissions
    await InitService.initPermissions()

    //Notification permissions
    await InitService.initPermissions([
        notiPermissions.NOTIFICATION_SHOW,
        notiPermissions.NOTIFICATION_CREATE,
        notiPermissions.NOTIFICATION_UPDATE
    ])

    //Dracul Customization module Permissions
    await initPermissionsCustomization()

    //Dracul Media Permissions
    await InitMediaPermissions()

    //Custom Module permissions
    await InitService.initPermissions(modulesPermissions)

    await InitService.initAdminRole()
    //await InitService.initOperatorRole()
    //await InitService.initSupervisorRole()

    await InitService.initRoles([repartidorRole, mostradorRole])

    await InitService.initRootUser()
    //await InitService.initSupervisorUser()
   // await InitService.initOperatorUser()

    await initCustomization()
}

export {initService}

export default initService
