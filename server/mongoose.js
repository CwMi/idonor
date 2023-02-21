var mongoose = require ('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/idonor", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {mongoose};