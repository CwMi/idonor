const express = require('express');
const axios = require('axios');
const { route } = require('./staff/appointment');
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login');

const Appointment = require('./staff/appointment')
const User = require('./staff/user')
const User2 = require('./cust/user')
const Request = require('./cust/request')
const Sell = require('./cust/sell')


router.use('/api/staff/appointment', Appointment)
router.use('/api/staff/user', User)
router.use('/api/cust/user', User2)
router.use('/api/cust/request', Request)
router.use('/api/cust/sell', Sell)


const sell = require('../../models/sell');
const Usr = require('../../models/user');
const reqD = require('../../models/request');
const { nextTick } = require('process');

// router.post('/api/webhook/:id', async (req,res) => {
//     try {
//         const chatId = req.body.message.chat.id;
//         const text = req.body.message.text;

//         if(text.split(' ')[0] == "/start") {
//             axios.post(`${url}${apiToken}/sendMessage`,
//             {
//                 chat_id: chatId,
//                 text: 'User ID: ' + req.user.id
//             })
//             .then((response) => {
//                 console.log(response)
//                 Usr.findByIdAndUpdate((req.user.id), {'telegram': chatId}, (err, result) => {
//                     console.log(result)
//                     if(result) {
//                         res.status(200).send(response);
//                     }
//                     else {
//                         res.status(401).send(err);
//                     }
//                 })
//             }).catch((error) => {
//                 res.status(401).send(error);
//             });
//         }
//         else {
//             res.status(401).send(error);
//         }

//     }
//     catch(error) {
//         res.status(401).send(error)
//     }
// })

module.exports = router