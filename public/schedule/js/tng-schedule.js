// tng-schedule.js
'use strict';

var app = angular.module('tng-schedule', [
    'angular-storage',
    'auth0',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router'
]).controller('scheduleController', function($scope){
    $scope.title = "Schedule";
});