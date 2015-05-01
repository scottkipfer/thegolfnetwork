var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var crypto = require('crypto');

var escapeProperty = function(value) {
    return _.escape(value);
};

var validateUniqueEmail = function(value, callback){
    var User = mongoose.model('User');
    User.find({
        $and:[{
            email: value
        }, {
            _id: {
                $ne: this._id
            }
        }]
    }, function(err,user){
        callback(err || user.length === 0);
    });
};

var validatePresenceOf = function(value){
    return (value && value.length > 5);
};


var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
        validate: [validateUniqueEmail, 'E-mail address is already in-use']
    },
    picture: {
        type: String,
        default: 'profilepicholder.svg'
    },
    roles: {
        type: Array,
        default:['user']
    },
    hashed_password: {
        type: String,
        validate: [validatePresenceOf, ' Password Must Be 6 characters long']
    },
    salt: String
});

/***************************************************************************************************
 *                                      Virtuals
 ***************************************************************************************************/
UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.hashed_password = this.hashPassword(password);
}).get(function(){
    return this._password;
});

/***************************************************************************************************
 *                                      Pre Save Hooks
 ***************************************************************************************************/

/***************************************************************************************************
 *                                      Methods
 ***************************************************************************************************/
UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.hashed_password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('User', UserSchema);