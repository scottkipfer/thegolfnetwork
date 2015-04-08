var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
   name: {
       first: {
           type: String,
           required: true
       },
       last: {
           type: String,
           required: true
       }
   }
});