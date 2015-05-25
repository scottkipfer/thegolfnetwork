'use strict';

var mongoose = require('mongoose');
var UserRound = mongoose.model('UserRound');

var Handicap = function(userId){
    //Find the last 20 approved rounds the golfer has played
    UserRound.find().where('golfer').equals(userId).where('status').equals('approved').sort('date',-1).limit(20).exec(function(err,rounds){
        console.log(rounds);
        rounds = trimRounds(rounds);

    });


};

var trimRounds = function(rounds){
    var trimmedRounds;
    // sort rounds by lowest handicap differential
    rounds = rounds.sort('handicap_diff', -1);
    // trim rounds based on USGA Section 10 Handicap Formula
    if(rounds.length === 20){
        trimmedRounds = rounds.slice(0,9);
    } else if (rounds.length === 19) {
        trimmedRounds = rounds.slice(0,8);
    } else if (rounds.length === 18) {
        trimmedRounds = rounds.slice(0,7);
    } else if (rounds.length === 17) {
        trimmedRounds = rounds.slice(0,6);
    } else if (rounds.length === 16 || rounds.length === 15) {
        trimmedRounds = rounds.slice(0,5);
    } else if (rounds.length === 14 || rounds.length === 13) {
        trimmedRounds = rounds.slice(0,4);
    } else if (rounds.length === 12 || rounds.length === 11) {
        trimmedRounds = rounds.slice(0,3);
    } else if (rounds.length === 10 || rounds.length === 9) {
        trimmedRounds = rounds.slice(0,2);
    } else if (rounds.length === 8 || rounds.length === 7) {
        trimmedRounds = rounds.slice(0,1);
    } else {
        trimmedRounds = rounds[0];
    }
    return trimmedRounds;
};