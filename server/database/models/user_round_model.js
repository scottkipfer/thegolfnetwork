var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserRoundSchema = new Schema({
    course:{
        type: String
    },
    golfer: {
        type: String
    },
    league_round: {
        type: String
    },
    scores: [{hole:Number,score:Number}]
});

/***************************************************************************************************
 *                                      Virtuals
 ***************************************************************************************************/

/***************************************************************************************************
 *                                      Pre Save Hooks
 ***************************************************************************************************/

module.exports = mongoose.model('UserRound', UserRoundSchema);