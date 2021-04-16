const mongoose = require('mongoose')
const Organization = require('./Organization')

/*
* Basic information about the bin. 1 location can have more then 1 bin
* In such way 1 locaton have bin for plastic, paper and organic, etc.
*/
const binSchema = new mongoose.Schema({
    latitude: {type: Number, required: [true, 'no latitude']},
    longitude: {type: Number, required: [true, 'no longitude']},
    type: {type: String, required: [true, 'no type']},
    color: {type: String, required: [true, 'no color']},
    pickupRequests: {type: Number, default: 0},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    organization: [{type: mongoose.Schema.Types.ObjectId, ref:'Organization'}]
});

const messageSchema = new mongoose.Schema({
    message: {type: String, required: [true, 'no message']}
});

module.exports.Bin = mongoose.model('Bin', binSchema);
module.exports.Message = mongoose.model('Message', messageSchema);