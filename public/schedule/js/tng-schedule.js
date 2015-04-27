// tng-schedule.js
'use strict';

var app = angular.module('tng-schedule', [
    'angular-storage',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router',
    'tng-courses'
]).factory('LeagueRounds', ['$resource',
    function($resource) {
        return $resource('league-round/:leagueroundId', {
            leagueroundId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]).controller('scheduleController', ['$scope', '$stateParams','$location','LeagueRounds','jwtHelper','store','$state','Courses', function($scope, $stateParams, $location, LeagueRounds, jwtHelper,store,$state,Courses){
    $scope.title = "Schedule";
    $scope.schedules = [];
    $scope.courses = [];


    var getCourses = function(){
        Courses.query(function(courses){
            $scope.courses = courses;
            console.log("Courses" +$scope.courses);
        })
    }
    $scope.create = function(){
      var league_round = new LeagueRounds({
          name: this.league_round.name,
          date: this.league_round.date,
          course: this.league_round.course._id
      });
        console.log(league_round);
        league_round.$save(function() {
            $scope.find();
        });
    };

    $scope.find = function() {
        LeagueRounds.query(function(league_rounds) {
            $scope.league_rounds = league_rounds;
        });
        getCourses();
    };

    $scope.findOne = function() {
        LeagueRounds.get({
            leagueroundId: $stateParams.leagueroundId
        }, function(round){
            console.log(round);
            $scope.round = round;
        });
    };

}]);