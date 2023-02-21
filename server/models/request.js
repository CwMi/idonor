const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var requestSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: String,
    desc: String,
    //Place
    address: String,
    details: String,
    latitude: String,
    longitude: String,
    city: String,
    date: Date,
    status: {
        type: String,
        enum: ['Active', 'Unlisted', 'Deleted'],
        default: 'Active'
    }
}, {
    timestamps: true
})

var Request = module.exports = mongoose.model('Request', requestSchema)