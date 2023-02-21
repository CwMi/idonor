var mongoose = require ('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin:123@idonor.h0k7gj3.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {mongoose};