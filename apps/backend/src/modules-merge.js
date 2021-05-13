import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas';
import {securityResolvers,securityTypes} from '@dracul/user-backend'
import {resolvers as mediaResolvers,types as mediaTypes} from '@dracul/media-backend'

import {types as customTypes,resolvers as customResolvers} from '@dracul/customize-backend'
import {types as notificationTypes,resolvers as notificationResolvers} from '@dracul/notification-backend'

//BASE RESOLVERS
import {resolvers as baseResolvers } from './modules/base/graphql'
import {resolvers as deliveryResolvers } from './modules/delivery/graphql'
import {resolvers as mapsResolvers } from './modules/maps/graphql'
//BASE TYPEDEFS
import {types as baseTypes} from './modules/base/graphql'
import {types as deliveryTypes} from './modules/delivery/graphql'
import {types as mapsTypes} from './modules/maps/graphql'



export const resolvers = mergeResolvers([
    baseResolvers,
    deliveryResolvers,
    mapsResolvers,
    mediaResolvers,
    securityResolvers,
    notificationResolvers,
    customResolvers
])

export const typeDefs = mergeTypes([
    baseTypes,
    deliveryTypes,
    mapsTypes,
    securityTypes,
    mediaTypes,
    notificationTypes,
    customTypes
])
