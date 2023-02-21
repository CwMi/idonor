const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


var userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    gender: String,
    password: String,
    address: String,
    city: String,
    postcode: String,
    latitude: String,
    longitude: String,
    phone: String,
    role: String
})

var User = module.exports = mongoose.model('User', userSchema)

User.findOne({username: 'admin'}, function(err, result) {
    if(!result) {
        // Create a default user
        var adminUser = new User({
            username: 'admin',
            name: 'Admin',
            password: 'admin',
            role: 'admin'
        })

        createUser(adminUser, function(aux1, aux2){})
    }
})

function createUser(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err,hash) {
            newUser.password = hash;
            newUser.save(callback)
        })
    })
}
module.exports.createUser = createUser;

module.exports.getUserByUsername = function(username, callback) {
	User.findOne({
		username: username
	}, callback);
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if (err) {
			throw err;
		}
		callback(null, isMatch);
	});
};
