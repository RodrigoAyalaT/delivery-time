import {fetchGoogleGeocode, urlGoogleStreetViewImage} from "../providers/GoogleApi"
import path from "path";
import downloadFile from "../utils/downloadFile";

export const addressHandler = function (address) {

    return new Promise((resolve, reject) => {
            fetchGoogleGeocode(address)
                .then(response => {
                    return resolve(response.data.results)
                })
                .catch(e => {
                    return reject(e)
                })
        }
    )
}

export const streetViewImageHandler = function (latitude, longitude) {
    return new Promise(async (resolve) => {

        let urlToDownload = await urlGoogleStreetViewImage(latitude, longitude)

        const finalFileName = 'st_' + latitude + '_' + longitude + ".jpg"
        let filePath = path.join("media", "streetView", finalFileName)
        await downloadFile(urlToDownload, filePath);
        let localUrl = process.env.APP_API_URL + "/" + filePath

        resolve(localUrl)
    })
}

