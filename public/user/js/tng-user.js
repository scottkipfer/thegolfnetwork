'use strict';

var app = angular.module('tng-user', [
    'angular-storage',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router'
]).controller('userController',function($scope,$rootScope, store, jwtHelper){
    $scope.title = "Profile";
    $rootScope.$emit('stateChange',{state:$scope.title});
    $scope.loadUser = function(){
        var token = store.get('token');
        if(token){
            $scope.user = jwtHelper.decodeToken(token).user;
            console.log($scope.user);
        }
    }
});