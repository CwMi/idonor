const express = require('express');
const passport = require('passport');
const router = express.Router()

const Apt = require('../../../models/appointment')

// GET
router.get('/:id', (req, res) => {
            Apt.findOne({
                    id: req.params.id
                }, (err, data) => {
                    if (data) {
                        res.json(data)
                        }
                        else {
                            res.json("tak ada")
                        }
                    })
            })

        // Add
        router.post('/', (req, res) => {
            tmp = req.body;
            console.log(req.user.id)
            Apt.findOne({
                date: tmp.date,
                slot: tmp.slot
            }, function (err, result) {
                if (!result) {
                    var apt = new Apt({
                        doctor: req.user.id,
                        patient: tmp.patient,
                        date: tmp.date,
                        slot: tmp.slot
                    })


                    apt.save((err, doc) => {
                        if (!err) {
                            res.json({
                                status: 'success',
                                message: 'Appointment Has Been Added!'
                            })
                        } else {
                            res.json({
                                status: 'fail',
                                message: 'Appointment Has Not Been Added!'
                            })
                        }
                    })
                } else {
                    res.json({
                        status: 'fail',
                        message: 'Time Slot for the date has been booked!'
                    })
                }
            })
        })

        // Update
        router.put('/:id', (req, res) => {
            tmp = req.body;

            Apt.findByIdAndUpdate((req.params.id), {
                'patient': tmp.patient,
                'date': tmp.date,
                'slot': tmp.slot,
                'status': tmp.status
            }, function (err, result) {
                if (err) {
                    res.json({
                        status: "fail",
                        message: "Appointment failed to update!"
                    })
                } else {
                    res.json({
                        status: "success",
                        message: "Appointment has been updated"
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
                        message: "Appointment has been removed!"
                    })
                } else {
                    res.json({
                        status: "fail",
                        message: "Appointment has fail to be removed!"
                    })
                }
            })
        })

        module.exports = router;