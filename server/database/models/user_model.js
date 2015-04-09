var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var crypto = require('crypto');

var escapeProperty = function(value) {
    return _.escape(value);
};

var validateUniqueEmail = function(value){
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
    return (value && value.length);
}


var UserSchema = new Schema({
   name: {
       first: {
           type: String,
           required: true,
           get: escapeProperty
       },
       last: {
           type: String,
           required: true,
           get:escapeProperty
       }
   },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
        validate: [validateUniqueEmail, 'E-mail address is already in-use']
    },
    roles: {
        type: Array,
        default:['user']
    },
    hashed_password: {
        type: String,
        validate: [validatePresenceOf, ' Password cannot be blank']
    },
    salt: String
});

/***************************************************************************************************
 *                                      Virtuals
 ***************************************************************************************************/
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.hashPassword(password);
}).get(function() {
    return this._password;
});

/***************************************************************************************************
 *                                      Pre Save Hooks
 ***************************************************************************************************/


module.exports = mongoose.model('User', UserSchema);