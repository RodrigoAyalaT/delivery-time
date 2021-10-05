import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas';
import {securityResolvers,securityTypes} from '@dracul/user-backend'
import {resolvers as mediaResolvers,types as mediaTypes} from '@dracul/media-backend'

import {types as customTypes,resolvers as customResolvers} from '@dracul/customize-backend'
import {types as settingsTypes,resolvers as settingsResolvers} from '@dracul/settings-backend'
import {commonTypes} from '@dracul/common-backend'
import {types as notificationTypes,resolvers as notificationResolvers} from '@dracul/notification-backend'

//BASE RESOLVERS
import {resolvers as baseResolvers } from './modules/base/graphql'
import {resolvers as deliveryResolvers } from './modules/delivery/graphql'
import {resolvers as mapsResolvers } from './modules/maps/graphql'
import {resolvers as calendarResolvers } from './modules/calendar/graphql'
import {resolvers as paymentResolvers } from './modules/payment/graphql'
//BASE TYPEDEFS
import {types as baseTypes} from './modules/base/graphql'
import {types as deliveryTypes} from './modules/delivery/graphql'
import {types as mapsTypes} from './modules/maps/graphql'
import {types as calendarTypes} from './modules/calendar/graphql'
import {types as paymentTypes} from './modules/payment/graphql'



export const resolvers = mergeResolvers([
    baseResolvers,
    settingsResolvers,
    deliveryResolvers,
    mapsResolvers,
    calendarResolvers,
    paymentResolvers,
    mediaResolvers,
    securityResolvers,
    notificationResolvers,
    customResolvers
])

export const typeDefs = mergeTypes([
    baseTypes,
    commonTypes,
    settingsTypes,
    deliveryTypes,
    mapsTypes,
    calendarTypes,
    paymentTypes,
    securityTypes,
    mediaTypes,
    notificationTypes,
    customTypes
])
