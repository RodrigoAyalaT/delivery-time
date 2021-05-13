import axios from 'axios'

export const fetchGoogleGeocode = async function (addressUser) {
    const googleApiKey = process.env.GOOGLE_APIKEY

    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

    function getAddressUrl(address) {
        return encodeURI(baseUrl + '?address=' + address + '&key=' + googleApiKey)
    }

    return new Promise((resolve, reject) => {
            axios.get(getAddressUrl(addressUser))
                .then(json => {
                    resolve(json)
                }).catch(err => {
                console.error(err)
                reject(err)
            })
        }
    )
}
