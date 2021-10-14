import Product from "../../modules/delivery/models/ProductModel";
import winston from 'winston'

const fixProductSoftDelete = function () {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await Product.updateMany({deleted: {$exists: false}},
                {$set: {deleted: false, deletedAt: null}}
            )
            winston.info("Product soft deleted fixed. Documents affected:" + res.nModified)
            resolve(res)
        } catch (e) {
            reject(e)
        }

    })

}

export default fixProductSoftDelete
export {fixProductSoftDelete}

