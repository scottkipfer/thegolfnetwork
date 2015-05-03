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
        return $resource('teetime-byleague/:leagueroundId', {
            leagueroundId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]).factory('TeeTimes',['$resource',
    function($resource) {
        return $resource('teetime-bytee/:teetimeId', {
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
    $scope.user = {};

    // TODO make service
    var getUser = function(){
        var token = store.get('token');
        if(token){
            $scope.user = jwtHelper.decodeToken(token).user;
            console.log('Scope User '+ $scope.user.fullName);
        }
    };

    var checkUserForTeeTime = function(round,teetimes){
        var user = {
            status: 'pending',
            teetime : ''
        };
        teetimes.forEach(function(tee){
            tee.golfers.forEach(function(golfer){
                if(golfer._id === $scope.user._id){
                    user.status = 'signedup';
                    user.teetime = tee.time;
                }
            });
        });

        if(user.status === 'pending'){
            round.cant_make_it.forEach(function(golfer){
                if(golfer._id === $scope.user._id){
                    user.status ='cantmakeit';
                }
            });
        }

        $scope.user.status = user.status;
        $scope.user.teetime = user.teetime;
    };
    getUser();

    $scope.addToTeeTime = function(teetime){
       console.log(teetime);
        var added = false;
        teetime.golfers.forEach(function(golfer){
            if(golfer.name === 'empty' && added === false){
                golfer.name = $scope.user.fullName;
                golfer._id = $scope.user._id;
                added = true;
            }
        });

        if(added === true){
            var new_teetime = new TeeTimes(teetime);
            console.log(new_teetime);
            new_teetime.$update(function(){
                $scope.findOne();
            },function(){
                $scope.findOne();
                // todo display error
            });
        } else {
            // todo display adding to tee time error
        }
    };

    $scope.isTeeTimeFull = function(teetime){
        var isFull = true;
        teetime.golfers.forEach(function(golfer){
            if(golfer.name == 'empty'){
                    isFull = false;
            }
        });
        return isFull;
    };

    $scope.removeFromTeeTime = function(teetime){
        teetime.golfers.forEach(function(golfer){
            if(golfer._id === $scope.user._id){
                golfer._id = '';
                golfer.name = 'empty';
                golfer.picture = '';
            }
        });
        teetime.golfers.sort();
        var new_teetime = new TeeTimes(teetime);
        new_teetime.$update(function(){
            $scope.findOne();
        });

    };

    $scope.removeFromCantMakeIt = function(golfer_id){
        var index = -1;
        for(var i = 0, len = $scope.round.cant_make_it.length; i < len; i++){
            if($scope.round.cant_make_it[i]._id === golfer_id){
                index = i;
                break;
            }
        }
        if(index !== -1){
            console.log('here!');
            $scope.round.cant_make_it.splice(index,1);
        }
        var new_round = new LeagueRounds($scope.round);
        new_round.$update(function(){
            $scope.findOne();
        });
    };

    $scope.addToCantMakeItList = function(){
      $scope.round.cant_make_it.push({
          name: $scope.user.fullName,
          _id: $scope.user._id,
          picture: $scope.user.picture
      });
        console.log($scope.round.cant_make_it);
        $scope.round.$update(function(){
            $scope.findOne();
        })
    };

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
                console.log($scope.teetimes);
                checkUserForTeeTime(round,teetimes);
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