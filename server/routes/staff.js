const express = require('express');
const passport = require('passport');
const router = express.Router()
const LocalStrategy = require('passport-local').Strategy;

// Load Models
const User = require('../models/user.js')
const Apt = require('../models/appointment')
const Req = require('../models/request')
const Sell = require('../models/request')

// Logout , Login
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
})

router.get('/login', (req, res) => {
    res.render('staff/login', {
        message: res.locals.error_msg
    })
})

router.get('/register', (req, res) => {
    res.render('staff/register', {
        message: res.locals.error_msg
    })
})


// router.get('/forgot', (req,res) => {
//     res.json({status:'stil in development'})
// })

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
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

// Profile View
router.get('/profile', (req, res) => {
    Apt.find({}, (err, result) => {
        res.render('staff/profile/index', {
            title: 'Profile Page',
            data: result,
            staff: req.user
        })
    })
})

// Seller View
router.get('/appointment', (req, res) => {
    
   Sell.find({user:{$ne:req.user.id}}).populate({path:'user', model:User, select: {password:0} }).exec().then((data)=>{
        console.log(data)
        res.render('staff/sell/index', {
            title: 'View Request ',
            data: data,
            staff: req.user
        })
    })
})

// Appointment View
router.get('/appointment', (req, res) => {
    
    Req.find({user:{$ne:req.user.id}}).populate({path:'user', model:User, select: {password:0} }).exec().then((data)=>{
        console.log(data)
        res.render('staff/appointment/index', {
            title: 'View Request ',
            data: data,
            staff: req.user
        })
    })
})

// Appointment - Add
router.get('/appointment/add', (req, res) => {
    res.render('staff/appointment/add', {
        title: 'Add Appointment',
        staff: req.user,
        message: res.locals.error_msg
    })
})

// Apopintment - Update
router.get('/appointment/:id', (req, res) => {
    Apt.findById(req.params.id, (err, result) => {
        if (result) {
            res.render('staff/appointment/update', {
                title: 'Update Appointment',
                data: result,
                staff: req.user
            })
        } else {
            res.redirect('/staff')
        }
    })
})

// Manage User View
router.get('/user', (req, res) => {
    User.find({user:{$ne:req.user.id}}).exec().then((data)=>{
        console.log(data)
        res.render('staff/user/index', {
            title: 'Manage User',
            data: data,
            staff: req.user
        })
    })
})

router.get('/user/add', (req, res) => {
    res.render('staff/user/add', {
        title: 'Add User',
        staff: req.user,
        message: res.locals.error_msg
    })
})

router.get('/user/:id', (req, res) => {
    User.findById(req.params.id, (err, result) => {
        console.log(result)
        if (result) {
            res.render('staff/user/update', {
                title: 'Update Staff',
                data: result,
                staff: req.user
            })
        } else {
            res.redirect('/user')
        }
    })
})


module.exports = router