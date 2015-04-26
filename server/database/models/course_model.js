var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
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
CourseSchema.statics.load = function(id,cb) {
    this.findOne({
        _id:id
    }).exec(cb);
};

module.exports = mongoose.model('Course', CourseSchema);