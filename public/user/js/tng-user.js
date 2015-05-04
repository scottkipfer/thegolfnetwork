'use strict';

var app = angular.module('tng-user', [
    'angular-storage',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router'
]).factory('Users', ['$resource',
    function($resource) {
        return $resource('users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        })
    }
]).controller('userController',function($scope,$rootScope, store, jwtHelper){
    $scope.title = "Profile";
    $rootScope.$emit('stateChange',{state:$scope.title});
    $scope.loadUser = function(){
        var token = store.get('token');
        if(token){
            $scope.user = jwtHelper.decodeToken(token).user;
            $rootScope.$emit('stateChange',{state:$scope.user.fullName});
        }

    }
}).controller('profileController', function($scope, $rootScope, Users, $stateParams){
    $scope.title = "Profile";
    $rootScope.$emit('stateChange',{state:$scope.title});
    $scope.loadUser = function() {
        findOne();
    };

    var findOne = function(){
        Users.get({
            userId: $stateParams.userId
        }, function(user){
            console.log(user);
            $scope.user = user;
            $rootScope.$emit('stateChange',{state:$scope.user.fullName});
        })
    };
});