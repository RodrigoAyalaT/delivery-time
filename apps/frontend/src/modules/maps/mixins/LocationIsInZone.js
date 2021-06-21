import ZoneProvider from "../providers/ZoneProvider";

export default {
    data() {
        return {
            loadingInZone: false,
            inZone: null,
            zone: null
        }
    },
    methods: {
        locationIsInZone(location) {
            return new Promise((resolve, reject) => {
                if (location.latitude && location.longitude) {
                    this.loadingInZone = true
                    ZoneProvider.fetchZonePoint({latitude: location.latitude, longitude: location.longitude})
                        .then(r => {
                            if (r.data.zonePoint) {
                                this.inZone = true
                                this.zone = r.data.zonePoint
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
