const mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    doctor: {
        type: String
    },
    patient: {
        type: String
    },
    date: {
        type: Date
    },
    slot: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
},{ timestamps: true } )

var Appoinntment = module.exports = mongoose.model('Appointment', appointmentSchema)