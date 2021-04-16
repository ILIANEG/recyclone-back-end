const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

/*
* Each registered organization have to provide complete information
* to allow communication
*/
const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'no name']},
    email: {type: String, required: [true, 'no email'], unique: [true, 'this email is already registered in the system']},
    phone: {type: Number, unique: [true, 'phone number exists']},
    password: {type: String, required: [true, 'no password']},
    lastAdded: {type: Data},
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(login, password) {
    const user = await this.findOne({login});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect login');
}

module.exports.User = mongoose.model('User', userSchema);