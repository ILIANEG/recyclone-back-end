const mongoose = require('mongoose')

/*
* Basic information about the bin. 1 location can have more then 1 bin
* In such way 1 locaton have bin for plastic, paper and organic, etc.
*/
const binSchema = new mongoose.Schema({
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    binType: {type: String, required: true},
    binColor: {type: String, required: true},
    pickupRequests: {type: Number, required: false, default: 0},
})

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

/* 
* Registered bin always have responsible owner and servicer, it is possible that
* owner=services (example 'city of ottawa' is both owns and services the bin)
*/
const binServiceSchema = new mongoose.Schema({
    bin: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Bin'},
    owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Organization'},
    service: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Organization'}
})



module.exports.Bin = mongoose.model('Bin', binSchema);
module.exports.Organization = mongoose.model('Organization', organisationSchema);
module.exports.BinService = mongoose.model('BinService', binServiceSchema);