import Zone from './../models/ZoneModel'
import {UserInputError} from 'apollo-server-express'

export const pointZones = async function (latitude,longitude) {
    return new Promise((resolve, reject) => {
        Zone.find(
            { location: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ longitude, latitude ] } } } }
        ).exec((err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        });
    })
}

export const pointZone = async function (latitude,longitude) {
    return new Promise((resolve, reject) => {
        Zone.findOne(
            { location: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ longitude, latitude ] } } } }
        ).exec((err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        });
    })
}

export const findZone = async function (id) {
    return new Promise((resolve, reject) => {
        Zone.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchZones = async function () {
    return new Promise((resolve, reject) => {
        Zone.find({}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateZones = function ( pageNumber = 1, itemsPerPage = 5, search = null, orderBy = null, orderDesc = false) {

    function qs(search) {
        let qs = {}
        if (search) {
            qs = {
                $or: [
                    {name: {$regex: search, $options: 'i'}}
                ]
            }
        }
        return qs
    }

     function getSort(orderBy, orderDesc) {
        if (orderBy) {
            return (orderDesc ? '-' : '') + orderBy
        } else {
            return null
        }
    }

    let query = qs(search)
    let populate = null
    let sort = getSort(orderBy, orderDesc)
    let params = {page: pageNumber, limit: itemsPerPage, populate, sort}

    return new Promise((resolve, reject) => {
        Zone.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}





export const createZone = async function (authUser, {name, color, value, location}) {
    console.log("Location",location)
    const doc = new Zone({
        name, color, value, location
    })
    doc.id = doc._id;
    return new Promise((resolve, rejects) => {
        doc.save((error => {

            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                rejects(error)
            }

            resolve(doc)
        }))
    })
}

export const updateZone = async function (authUser, id, {name, color, value, location}) {
    return new Promise((resolve, rejects) => {

        console.log("Location",location)

        Zone.findOneAndUpdate({_id: id},
        {name, color, value, location},
        {new: true, runValidators: true, context: 'query'},
        (error,doc) => {

            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                rejects(error)
            }

            resolve(doc)
        })
    })
}

export const deleteZone = function (id) {
    return new Promise((resolve, rejects) => {
        findZone(id).then((doc) => {
            doc.delete(function (err) {
                err ? rejects(err) : resolve({id: id, success: true})
            });
        })
    })
}

