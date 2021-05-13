import fs from "fs";
import request from 'request';
import {createDirIfNotExist} from "@dracul/common-backend"

const downloadFile = async function (url, dest) {



    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    return  new Promise((resolve, reject) => {
        createDirIfNotExist(dest)

        /* Create an empty file where we can save data */
        const file = fs.createWriteStream(dest);

        request({
            uri: url,
            gzip: true,
        })
            .pipe(file)
            .on('finish', async () => {
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    })

}

export default downloadFile
