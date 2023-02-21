// Require Modules
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
// const LocalStrategy = require('passport-local').Strategy;
// const mongo = require('mongodb');
require('./server/mongoose.js');
// const { Router } = require('express');


const PORT = '80'

const app = express();

// Set view engine
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "client/views"))

//Store session into db
const sessionStore = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/medicine',
    collection: 'sessions'
})


// Bodyparser Middleware + Express session
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// session -> keep the user loggin after he login in on the website
//         -> creates an object req.session, where you can add properties
//         -> (ex: req.session.page_views, to count how many times he entered on the page)
app.use(session({
    secret: 'medrem0011',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week in miliseconds
    },
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

// Initialize Passport (authetification) to keep persisten login data (i.e in cookies)
app.use(passport.initialize());
app.use(passport.session());

/*
    Flash to pop-up mesages in the browser
*/
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Load assets
app.use('/css', express.static(path.resolve(__dirname, "client/public/css")))
app.use('/img', express.static(path.resolve(__dirname, "client/public/img")))
app.use('/js', express.static(path.resolve(__dirname, "client/public/js")))
app.use('/scss', express.static(path.resolve(__dirname, "client/public/scss")))
app.use('/vendor', express.static(path.resolve(__dirname, "client/public/vendor")))

app.use('/pic', express.static(path.resolve(__dirname, "client/public/img/pic")))

// // Load Routes
const router = require('./server/routes/router')
app.use(router)


app.listen(PORT, () => {
    console.log("Server is running on http://127.0.0.1:"+PORT)
})