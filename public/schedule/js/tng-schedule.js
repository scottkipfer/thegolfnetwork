// tng-schedule.js
'use strict';

var app = angular.module('tng-schedule', [
    'angular-storage',
    'auth0',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router'
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
]).controller('scheduleController', ['$scope','$location','LeagueRounds', function($scope, $location, LeagueRounds){
    $scope.title = "Schedule";

    $scope.create = function(){
      var league_round = new LeagueRounds({
          name: this.league_round.name,
          date: this.league_round.date,
          course: this.league_round.course
      });
        console.log(league_round);
        league_round.$save(function(response) {
            $location.path('league-round/' + response._id);
        })
    };

}]);