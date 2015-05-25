var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/***************************************************************************************************
 *                                      Schema
 ***************************************************************************************************/

var UserRoundSchema = new Schema({
    date:{
        type: Date
    },
    golfer: {
        type: String
    },
    handicap: {
      type: Number
    },
    league_round: {
        type: String
    },
    status: {
        type: String,
        default: 'Incomplete'
    },
    course: {
        type: String
    },
    net_score: {
        type: Number
    },
    gross_score: {
        type: Number
    },
    tee: {
        teeId: String,
        name: String,
        slope: Number,
        rating: Number
    },
    scorecard: [{
        hole: Number,
        yardage: Number,
        handicap: Number,
        par: Number,
        score: Number,
        putts: Number,
        fairway: {
            type: Boolean,
            default: false
        },
        green_in_reg: {
            type: Boolean,
            default: false
        }
    }]
});

/***************************************************************************************************
 *                                      Virtuals
 ***************************************************************************************************/
UserRoundSchema.virtual('scores').get(function() {
    var scores = {
        worse: 0,
        double_bogeys: 0,
        bogeys: 0,
        pars: 0,
        birdies: 0,
        eagles: 0,
        albatrosses: 0,
        hole_in_ones:0
    };
    this.scorecard.forEach(function(score){
        if(score.score > (score.par+2)){
            scores.worse++;
        }
        if(score.score === (score.par+2)){
            scores.double_bogeys++;
        }
        if(score.score === (score.par+1)){
            scores.bogeys++;
        }
        if(score.score === (score.par)){
            scores.pars++;
        }
        if(score.score === (score.par-1)){
            scores.birdies++;
        }
        if(score.score === (score.par-2)){
            scores.eagles++;
        }
        if(score.score === (score.par-3)){
            scores.albatrosses++;
        }
        if(score.score === 1){
            scores.hole_in_ones++;
        }
    });
    return scores;
});

UserRoundSchema.virtual('fairways').get(function() {
    var fairways = 0;
    this.scorecard.forEach(function(score){
       if(score.fairway === true){
           fairways++;
       }
    });
    return fairways;
});

UserRoundSchema.virtual('greens').get(function() {
    var greens = 0;
    this.scorecard.forEach(function(score){
        if(score.green_in_reg === true){
            greens++;
        }
    });
    return greens;
});

UserRoundSchema.virtual('putts').get(function() {
    var putts = 0;
    this.scorecard.forEach(function(score){
        putts += score.putts;
    });
    return putts;
});

UserRoundSchema.virtual('saves').get(function() {
    var saves = 0;
    this.scorecard.forEach(function(score){
        if( (score.score === score.par) && (score.putts === 1 || score.putts === 0)){
            saves++;
        }

    });
    return saves;
});

/***************************************************************************************************
 *                                      Pre Save Hooks
 ***************************************************************************************************/
UserRoundSchema.pre('save', function(next){
    var handicap = 0;
    var grossScore = 0;
    var netScore;

    if(this.handicap && this.tee.slope){
        handicap = Math.round((this.tee.slope / 113) * this.handicap);
    }

    this.scorecard.forEach(function(score){
        grossScore += score.score;
    });

    netScore = grossScore - handicap;
    this.gross_score = grossScore;
    this.net_score = netScore;

    next();
});

UserRoundSchema.statics.load = function(id,cb) {
    this.findOne({
        _id:id
    }).exec(cb);
};

UserRoundSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('UserRound', UserRoundSchema);