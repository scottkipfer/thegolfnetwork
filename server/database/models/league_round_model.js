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
    dont_care: {
        type: Array
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

module.exports = mongoose.model('LeagueRound', LeagueRoundSchema);