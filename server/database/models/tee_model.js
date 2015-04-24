var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LeagueRoundSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: String
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