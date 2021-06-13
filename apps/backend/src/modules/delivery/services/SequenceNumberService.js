import SequenceNumber from "../models/SequenceNumberModel";
import {UserInputError} from "apollo-server-express";

export const createSequenceNumber = async function ({identifier}) {

    const doc = new SequenceNumber({
        identifier
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

            resolve(doc)
        }))
    })
}


export const incrementSequenceNumber = async function ( identifier) {
    return new Promise((resolve, rejects) => {
        SequenceNumber.findOneAndUpdate({identifier: identifier},
            {$inc:{sequence:1}, identifier},
            {new: true, runValidators: true, context: 'query', upsert: true},
            (error,doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        return rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                    }
                    return rejects(error)
                }

                resolve(doc.sequence)
            })
    })
}
