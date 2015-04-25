var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    tees: {
        type:Array
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    zipcode: {
        type: String,
        required:true
    }
});

/***************************************************************************************************
 *                                      Virtuals
 ***************************************************************************************************/

/***************************************************************************************************
 *                                      Pre Save Hooks
 ***************************************************************************************************/

module.exports = mongoose.model('Course', CourseSchema);