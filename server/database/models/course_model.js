var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
    name:{
        type: String
    },
    rating: {
        type: Number
    },
    slope: {
        type: Number
    },
    holes: [{hole:Number,par:Number,handicap:Number}]
});

/***************************************************************************************************
 *                                      Virtuals
 ***************************************************************************************************/

/***************************************************************************************************
 *                                      Pre Save Hooks
 ***************************************************************************************************/

module.exports = mongoose.model('Course', CourseSchema);