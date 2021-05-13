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

export const urlGoogleStreetViewImage = function (latitude, longitude){
    return new Promise(async (resolve)=>{

        const googleApiKey = process.env.GOOGLE_APIKEY

        function getUrl(baseUrl ,latitude,longitude, googleApiKey, size = '200x200') {
            return encodeURI(baseUrl + '?size='+ size + '&location=' + latitude + ',' + longitude + '&key=' + googleApiKey)
        }

        const baseUrl = 'https://maps.googleapis.com/maps/api/streetview'

        let urlToDownload = getUrl(baseUrl, latitude, longitude, googleApiKey)

        resolve(urlToDownload)

    })
}
