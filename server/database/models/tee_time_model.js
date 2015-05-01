var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TeeTimeSchema = new Schema({
    time:{
        type:Date
    },
    golfers: [{
        _id: String,
        name: {
            type:String,
            default: 'empty'
        },
        picture: String
    }],
    league_round: {
        type: String
    }
});

/***************************************************************************************************
 *                                      Virtuals
 ***************************************************************************************************/

/***************************************************************************************************
 *                                      Pre Save Hooks
 ***************************************************************************************************/
TeeTimeSchema.statics.load = function(id,cb) {
    this.findOne({
        _id:id
    }).exec(cb);
};

module.exports = mongoose.model('TeeTime', TeeTimeSchema);