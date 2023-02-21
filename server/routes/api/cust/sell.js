const express = require('express');
const passport = require('passport');
const router = express.Router()

const Apt = require('../../../models/sell')

// GET
router.get('/:id', (req, res) => {
    Apt.findOne({
        id: req.params.id
    }, (err, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json("tak ada")
        }
    })
})

// Add
router.post('/', (req, res) => {
    tmp = req.body;
    console.log(req.user.id)
            var apt = new Apt({
                user: req.user.id,
                item: tmp.item,
                desc: tmp.desc,
                status: tmp.status,
                price: tmp.price,
                 //Place
                 address: tmp.address,
                 details: tmp.details,
                 latitude: tmp.latitude,
                 longitude: tmp.longitude,
                 city: tmp.city,
            })

            apt.save((err, doc) => {
                if (!err) {
                    res.json({
                        status: 'success',
                        message: 'Item has been listed!'
                    })
                } else {
                    res.json({
                        status: 'Fail',
                        message: 'Item failed to list!'
                    })
                }
            })
            
    })

// Update
router.put('/:id', (req, res) => {
    tmp = req.body;

    Apt.findByIdAndUpdate((req.params.id), {
        'item': tmp.item,
        'desc': tmp.desc,
        'price': tmp.price,
        'status': tmp.status,
         //Place
         'address': tmp.address,
         'details': tmp.details,
         'latitude': tmp.latitude,
         'longitude': tmp.longitude,
         'city': tmp.city,
    }, function (err, result) {
        if (err) {
            res.json({
                status: "Fail",
                message: "Your listing failed to update!"
            })
        } else {
            res.json({
                status: "success",
                message: "Your listing has been updated!"
            })
        }
    })
})

// Delete
router.delete('/:id', (req, res) => {
    Apt.findByIdAndRemove(req.params.id, function (err, result) {
        if (!err) {
            res.json({
                status: "success",
                message: "Your listing has been removed!"
            })
        } else {
            res.json({
                status: "Fail",
                message: "Your listing failed to removed"
            })
        }
    })
})

module.exports = router;