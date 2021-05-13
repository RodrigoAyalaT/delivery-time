import Location from './../models/LocationModel'
import {UserInputError} from 'apollo-server-express'

export const findLocation = async function (id) {
    return new Promise((resolve, reject) => {
        Location.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchLocations = async function () {
    return new Promise((resolve, reject) => {
        Location.find({}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateLocations = function (pageNumber = 1, itemsPerPage = 5, search = null, orderBy = null, orderDesc = false) {

    function qs(search) {
        let qs = {}
        if (search) {
            qs = {
                $or: [
                    {country: {$regex: search, $options: 'i'}}
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
        Location.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}


export const createLocation = async function (authUser, {address, floor, apartment, latitude, longitude, country, province, locality, postalCode}) {

    let point = null
    if (latitude && longitude) {
        point = {type: 'Point', coordinates: [latitude, longitude]}

    }

    const doc = new Location({
        address, floor, apartment, latitude, longitude, country, province, locality, postalCode, point
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

export const updateLocation = async function (authUser, id, {address, floor, apartment, latitude, longitude, country, province, locality, postalCode}) {
    return new Promise((resolve, rejects) => {

        let point = null
        if (latitude && longitude) {
            point = {type: 'Point', coordinates: [latitude, longitude]}

        }

        Location.findOneAndUpdate({_id: id},
            {address, floor, apartment, latitude, longitude, country, province, locality, postalCode, point},
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {

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

export const deleteLocation = function (id) {
    return new Promise((resolve, rejects) => {
        findLocation(id).then((doc) => {
            doc.delete(function (err) {
                err ? rejects(err) : resolve({id: id, success: true})
            });
        })
    })
}

