import axios from 'axios'

function getComponents(){
    if(process.env.GOOGLE_COUNTRY || process.env.GOOGLE_LOCALITY){
        let filters = []
        if(process.env.GOOGLE_COUNTRY) filters.push('country:' + process.env.GOOGLE_COUNTRY)

        if(process.env.GOOGLE_LOCALITIES){
            let localities = process.env.GOOGLE_LOCALITIES.split("|")
            localities.forEach(locality=> {
                filters.push('locality:' + locality)
            })

        }

        return  '&components='+ filters.join('|')
    }
    return ''
}

function getBounds(){
    if(process.env.GOOGLE_BOUNDS){
        return '&bounds='+process.env.GOOGLE_BOUNDS
    }
    return ''
}

export const fetchGoogleGeocode = async function (addressUser) {
    const googleApiKey = process.env.GOOGLE_APIKEY

    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

    function getAddressUrl(address) {

        if(process.env.GOOGLE_ADDRESS_SUFFIX){
            address += process.env.GOOGLE_ADDRESS_SUFFIX
        }

        let uri = encodeURI(baseUrl + '?address=' + address + getBounds() + getComponents() + '&key=' + googleApiKey)
        console.log("URI",uri)
        return uri
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
