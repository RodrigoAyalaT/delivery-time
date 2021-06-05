import Calendar from './../models/CalendarModel'
import {UserInputError} from 'apollo-server-express'

export const findCalendar = async function (id) {
    return new Promise((resolve, reject) => {
        Calendar.findOne({_id: id}).populate('user').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findCalendarByIdentifier = async function (identifier) {
    return new Promise((resolve, reject) => {
        Calendar.findOne({identifier: identifier}).populate('user').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchCalendars = async function () {
    return new Promise((resolve, reject) => {
        Calendar.find({}).populate('user').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateCalendars = function (pageNumber = 1, itemsPerPage = 5, search = null, orderBy = null, orderDesc = false) {

    function qs(search) {
        let qs = {}
        if (search) {
            qs = {
                $or: [
                    {name: {$regex: search, $options: 'i'}},
                    {description: {$regex: search, $options: 'i'}},
                    {identifier: {$regex: search, $options: 'i'}}
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
    let populate = ['user']
    let sort = getSort(orderBy, orderDesc)
    let params = {page: pageNumber, limit: itemsPerPage, populate, sort}

    return new Promise((resolve, reject) => {
        Calendar.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}


export const createCalendar = async function (authUser, {name, description, identifier, user, priority, schedule}) {

    const doc = new Calendar({
        name, description, identifier, user, priority, schedule
    })
    doc.id = doc._id;
    return new Promise((resolve, rejects) => {
        doc.save((error => {

            if (error) {
                if (error.name == "ValidationError") {
                    return rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                return rejects(error)
            }

            doc.populate('user').execPopulate(() => resolve(doc))
        }))
    })
}

export const updateCalendar =  function (authUser, id, {name, description, identifier, user, priority, schedule}) {

    console.log("Schedule", schedule)

    return new Promise(async (resolve, rejects) => {

       await Calendar.updateOne(
            { _id: id },
            { $set: { 'schedule': schedule }});


        Calendar.findOneAndUpdate({_id: id},
            {
                name, description, identifier, user, priority

            },
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        return rejects(new UserInputError(error.message, {inputErrors: error.errors}));

                    }
                    return rejects(error)

                }

                doc.populate('user').execPopulate(() => resolve(doc))
            })
    })
}

export const deleteCalendar = function (id) {
    return new Promise((resolve, rejects) => {
        findCalendar(id).then((doc) => {
            doc.delete(function (err) {
                err ? rejects(err) : resolve({id: id, success: true})
            });
        })
    })
}

