const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dob: String,
    gender: {
        type: String,
        enum: ['male','female']
    },
    phone: String,
    token: String,
    telegram: {type:String, default: null},
    password: String,
})

var Patient = module.exports = mongoose.model('patient', patientSchema)

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
	Patient.findOne({
		username: username
	}, callback);
}

module.exports.getUserById = function(id, callback) {
	Patient.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if (err) {
			throw err;
		}
		callback(null, isMatch);
	});
};
