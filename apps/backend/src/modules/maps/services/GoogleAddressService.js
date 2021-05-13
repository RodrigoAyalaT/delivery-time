import {fetchGoogleGeocode} from "../providers/GoogleApi"

export const addressHandler = function (address) {
    return new Promise(async (resolve) => {
        let locations = await getAddress(address)
        let filteredLocations = locations.data.results
        resolve(filteredLocations)
    })
}


const getAddress = function (address) {
    return new Promise((resolve, reject) => {
            try {
                fetchGoogleGeocode(address)
                    .then(response => {
                        return resolve(response)
                    })
                    .catch(e => {
                        return reject(e)
                    })
            } catch (e) {
                throw new Error(e)
            }

        }
    )
}
