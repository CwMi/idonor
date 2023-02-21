const express = require('express');
const passport = require('passport');
const router = express.Router()
const LocalStrategy = require('passport-local').Strategy;

// Load Models
const User = require('../models/user.js')
const Apt = require('../models/appointment')
const Request = require('../models/request')
const Sell = require('../models/sell')


// Logout , Login
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
})

router.get('/login', (req, res) => {
    res.render('/login', {
        message: res.locals.error_msg
    })
})

router.get('/', (req, res) => {
    Request.find({user:{$ne:req.user.id}}).populate({path:'user', model:User, select: {password:0} }).exec().then((data)=>{
        console.log(data)
        res.render('cust/index', {
                        title: 'Dashboard',
                        data: data,
                        staff: req.user
                    })
    })
})

// router.get('/', (req, res) => {
//     res.render('cust/index', {
//         title: 'Dashboard',
//         staff: req.user
//     })
// })

// router.get('/forgot', (req,res) => {
//     res.json({status:'stil in development'})
// })

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password'
}), function (req, res) {
    res.redirect('/')
})

// the Middleware for authetification -> provided by the passport library
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                //     done(error, found the user)
                return done(null, false, {
                    type: 'error_msg',
                    message: 'Unknown User'
                });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) {
                    throw err;
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        type: 'error_msg',
                        message: 'Invalid Password'
                    });
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

// *****************************************
// Profile View
router.get('/profile', (req, res) => {
    User.findById((req.user.id), (err, result) => {
        res.render('cust/profile/index', {
            title: 'Profile Page',
            data: result,
            staff: req.user
        })
    })
})
// *****************************************

// DONATION
// Donation Index
router.get('/donate', (req, res) => {
//    Request.find({user:{$ne:req.user.id}}, (err, result) => {
//     console.log(result)
//         res.render('cust/donate/index', {
//             title: 'Donation',
//             data: result,
//             staff: req.user
//         })
//     })
Request.find({user:{$ne:req.user.id}}).populate({path:'user', model:User, select: {password:0} }).exec().then((data)=>{
    // console.log(data)
    res.render('cust/donate/index', {
                    title: 'Donation',
                    data: data,
                    staff: req.user
                })
})
})

router.get('/donate/detail/:id', (req, res) => {
    Request.findById((req.params.id)).populate({path:'user', model:User, select: {password:0} }).exec().then((data)=>{
        // console.log(data)
        res.render('cust/donate/detail', {
                        title: 'Requester Details',
                        data: data,
                        staff: req.user
                    })
    })
    })
// router.get('/donate/detail', (req, res) => {
//     Apt.find({}, (err, result) => {
//         res.render('cust/donate/detail', {
//             title: 'Requester Details',
//             data: result,
//             staff: req.user
//         })
//     })
// })
// *****************************************

// *****************************************
// Request
// Request Index
router.get('/request', (req, res) => {
    Request.find({user: req.user.id}, (err, result) => {
        res.render('cust/request/index', {
            title: 'Request',
            data: result,
            staff: req.user
        })
    })
})

router.get('/request/detail/:id', (req, res) => {
    Request.findById((req.params.id), (err, result) => {
        // console.log(result)
        res.render('cust/request/detail', {
            title: 'Edit Request',
            data: result,
            staff: req.user
        })
    })
})
router.get('/request/add', (req, res) => {
    Apt.find({}, (err, result) => {
        res.render('cust/request/add', {
            title: 'Request Donation',
            data: result,
            staff: req.user
        })
    })
})
// *****************************************

// *****************************************
// Buy/Sell
// Buy/Sell Index
router.get('/buy', (req, res) => {
    Sell.find({user:{$ne:req.user.id}}).populate({path:'user', model:User, select: {password:0} }).exec().then((data)=>{
        res.render('cust/buy/index', {
                        title: 'Buy Items',
                        data: data,
                        staff: req.user
                    })
    })
    })

// router.get('/buy', (req, res) => {
//     Apt.find({}, (err, result) => {
//         res.render('cust/buy/index', {
//             title: 'Buy & Sell',
//             data: result,
//             staff: req.user
//         })
//     })
// })

router.get('/buy/detail/:id', (req, res) => {
    Sell.findById((req.params.id)).populate({path:'user', model:User, select: {password:0} }).exec().then((data)=>{
        res.render('cust/buy/detail', {
                        title: 'Seller Details',
                        data: data,
                        staff: req.user
                    })
    })
    })
// router.get('/buy/detail', (req, res) => {
//     Apt.find({}, (err, result) => {
//         res.render('cust/buy/detail', {
//             title: 'Seller Details',
//             data: result,
//             staff: req.user
//         })
//     })
// })


// Sell Items
router.get('/buy/sell/item', (req, res) => {
    Sell.find({user: req.user.id}, (err, result) => {
        
        res.render('cust/buy/sell/item', {
            title: 'Listing Items',
            data: result,
            staff: req.user
        })
    })
})

// router.get('/buy/sell/item', (req, res) => {
//     Apt.find({}, (err, result) => {
//         res.render('cust/buy/sell/item', {
//             title: 'Item Listings',
//             data: result,
//             staff: req.user
//         })
//     })
// })
router.get('/buy/sell/itemDetail/:id', (req, res) => {
    Sell.findById((req.params.id), (err, result) => {
        console.log(result)
        res.render('cust/buy/sell/itemDetail', {
            title: 'Edit Listing',
            data: result,
            staff: req.user
        })
    })
})

// *****************************************
module.exports = router