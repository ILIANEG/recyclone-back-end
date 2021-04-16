const mongoose = require('mongoose')

/*
* Each registered organization have to provide complete information
* to allow communication
*/
const organisationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    adress: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
})


module.exports.Organization = mongoose.model('Organization', organisationSchema);