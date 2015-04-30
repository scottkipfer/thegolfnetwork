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
]).factory('TeeTimesByRound',['$resource',
    function($resource) {
        return $resource('teetime/:leagueroundId', {
            leagueroundId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]).factory('TeeTimes',['$resource',
    function($resource) {
        return $resource('teetime/:teetimeId', {
            teetimeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]).controller('scheduleController', ['$scope', '$rootScope', '$stateParams','$location','LeagueRounds','jwtHelper','store','$state','Courses', 'TeeTimes','TeeTimesByRound', function($scope, $rootScope, $stateParams, $location, LeagueRounds, jwtHelper,store,$state,Courses,TeeTimes,TeeTimesByRound){
    $scope.title = "Schedule";
    $rootScope.$emit('stateChange',{state:$scope.title});

    var updateBreadCrumb = function(){
        console.log('Current State: ' + $state.current.name);
      switch($state.current.name){
            case 'schedule-view':
                $rootScope.$emit('stateChange',{state:$scope.title});
                break;
            case 'league round by id':
                if($scope.round){
                    $rootScope.$emit('stateChange',{state:$scope.round.name});
                }
                break;
        }
    };

    $scope.schedules = [];
    $scope.courses = [];

    updateBreadCrumb();

    var getCourses = function(){
        Courses.query(function(courses){
            $scope.courses = courses;
            console.log("Courses" +$scope.courses);
        })
    };

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
            TeeTimesByRound.query({
                leagueroundId: round._id
            },function(teetimes){
               $scope.teetimes = teetimes;
            });
            Courses.get({
                courseId: round.course
            }, function(course){
                $scope.course = course;
            });

            $scope.round = round;
            updateBreadCrumb();
        });
    };

}]);