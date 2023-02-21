const express = require('express');
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login');

// Load Routes
const ApiRoutes = require('./api/router')
const staffRoutes = require('./staff')
const custRoutes = require('./cust')

// Dashboard View
// router.get('/', connectEnsureLogin.ensureLoggedIn('/login'),(req,res) => {
//     res.render('staff/index', {title: 'Dashboard', staff: req.user})
// })

router.get('/', connectEnsureLogin.ensureLoggedIn('/login'), (req,res) => {
    role = req.user.role

    if(role == 'admin' ) {
        res.render('staff/index', {title: 'Dashboard', staff: req.user})
    } 
    else {
        res.redirect('/cust') 
    }
})


router.use('/cust',custRoutes)
router.use(staffRoutes)
router.use(ApiRoutes)

module.exports = router