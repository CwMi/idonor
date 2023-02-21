const express = require('express');
const passport = require('passport');
const router = express.Router()

const User = require('../../../models/user')

router.post('/', (req,res) => {
    tmp = req.body;
    User.findOne({username: tmp.username}, function(err, result) {
        if(!result) {
            // Create a default user
            var user = new User({
                username: tmp.username,
                name: tmp.name,
                password: tmp.password,
                role: 'admin',
                email: tmp.email,
            })
    
            User.createUser(user, function(aux1, aux2){})
            res.json({status: "success", message: "User has been added!"})
        }
        else {
            res.json({status: "fail", message: "User already existed!"})
        }
    })
})

router.put('/:id', (req,res) => {
    staffId = req.params.id;
    staffName = req.body.name;
    username = req.body.username;
    password = req.body.password || null;
    role = req.body.role;

    User.findByIdAndUpdate((staffId), {'name': staffName, 'username': username, 'role': role}, function(err, result) {
        if(err)
        {
            res.json({status: "fail", message: "User failed to update"})
        }
        else
        {
            res.json({status: "success", message: "User has been updated"})
        }
    }) 

})

router.delete('/:id', (req,res)=>{
    User.findByIdAndRemove(req.params.id, function(err,result){
        if(!err) {
            res.json({status: "success", message: "User has been removed!"})
        }
        else {
            res.json({status: "fail", message: "User has fail to be removed!"})
        }
    })
})

module.exports = router;