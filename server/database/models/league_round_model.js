var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LeagueRoundSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date:{
       type:Date
    },
    cant_make_it: {
        type: Array
    },
    dont_care: [{
        _id: String,
        name: String,
        picture: String
    }],
    course: {
        type: String
    },
    status: {
        type: String,
        default: 'Scheduled'
    }
});

/***************************************************************************************************
 *                                      Virtuals
 ***************************************************************************************************/

/***************************************************************************************************
 *                                      Pre Save Hooks
 ***************************************************************************************************/
LeagueRoundSchema.statics.load = function(id,cb) {
    this.findOne({
        _id:id
    }).exec(cb);
};


module.exports = mongoose.model('LeagueRound', LeagueRoundSchema);