import ZoneProvider from "../providers/ZoneProvider";

export default {
    data() {
        return {
            loadingInZone: false,
            inZone: null
        }
    },
    methods: {
        locationIsInZone(location) {
            return new Promise((resolve, reject) => {
                this.loadingInZone = true
                if (location.latitude && location.longitude) {
                    ZoneProvider.fetchZonesPoint({latitude: location.latitude, longitude: location.longitude})
                        .then(r => {
                            if (r.data.zonesPoint.length) {
                                this.inZone = true
                                return resolve(true)
                            } else {
                                this.inZone = false
                                return resolve(false)
                            }
                        })
                        .catch(e => reject(e))
                        .finally(() => this.loadingInZone = false)
                }
            })

        }
    }
}
