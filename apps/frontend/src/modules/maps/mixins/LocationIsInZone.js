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
        clearZone(){
            this.zone = null
            this.inZone = null
        },
        findLocationZone(location) {
            return new Promise((resolve, reject) => {
                if (location.latitude && location.longitude) {
                    this.loadingInZone = true
                    ZoneProvider.fetchZonePoint({latitude: location.latitude, longitude: location.longitude})
                        .then(r => {
                            this.zone = r.data.zonePoint
                            this.inZone = !!this.zone
                            return resolve(this.zone)
                        })
                        .catch(e => reject(e))
                        .finally(() => this.loadingInZone = false)
                }else {
                    this.clearZone()
                    return resolve(false)
                }
            })

        }
    }
}
