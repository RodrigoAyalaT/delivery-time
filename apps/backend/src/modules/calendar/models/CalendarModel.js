const mongoose = require('mongoose');


const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const hourValidation = function (value) {
    let r = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return r.test(value);
}

const ScheduleSchema = new Schema({
    dayOfWeek: {type: Number, unique: true, required: true},
    dayName: {type: String, unique: true, required: true},
    activeHours: [
        {
            from: {type: String, validate: {validator: hourValidation, message: "validation.hourFormat"} },
            to: {type: String, validate: {validator: hourValidation, message: "validation.hourFormat"} }
        }
    ]
})

const CalendarSchema = new Schema({

    name: {type: String, required: true, unique: true},
    description: {type: String, required: false, unique: false},
    identifier: {type: String, required: true, unique: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false, unique: false},
    priority: {type: Number, required: false, unique: false},
    schedule: [ScheduleSchema]

});


CalendarSchema.plugin(mongoosePaginate);
CalendarSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const Calendar = mongoose.model('Calendar', CalendarSchema);

module.exports = Calendar;
