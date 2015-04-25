var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    holes: [{
        number:Number,
        par:Number,
        yardage:Number,
        handicap:Number
    }],
    slope: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

/***************************************************************************************************
 *                                      Virtuals
 ***************************************************************************************************/

/***************************************************************************************************
 *                                      Pre Save Hooks
 ***************************************************************************************************/

module.exports = mongoose.model('Tee', TeeSchema);