const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sellSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: String,
    desc: String,
    price: String,
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

var Sell = module.exports = mongoose.model('Sell', sellSchema)