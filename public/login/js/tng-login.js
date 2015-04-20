// tng-login.js
'use strict';

var app = angular.module('tng-login', [
    'angular-storage',
    'auth0',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router'
]).controller('loginController', function($scope, $rootScope, $http, $state){
    $scope.title = "Login";

    $scope.user = {};

    $scope.login = function(){
        $http.post('/signin', {
            email:$scope.user.email,
            password:$scope.user.password
        })
            .success(function(response) {
                //AUTH OK!
                console.log('OK');
                $scope.loginError = 0;
                $rootScope.user = response.user;
                $rootScope.$emit('loggedin');
                $state.go('schedule-view');
            })
            .error(function(){
                $scope.loginerror = 'Authentication failed';
            })
    }

}).controller('forgotPasswordController', function($scope){
    $scope.title = "Forgot Password";
}).controller('signupController', function($scope, $rootScope, $http, $location){
    $scope.title = "Sign Up";
    $scope.user = {};

    $scope.signup = function() {
         $scope.usernameError = null;
         $scope.registerError = null;

        if($scope.user.password === $scope.user.confirm_password){
            $http.post('/signup', {
                email: $scope.user.email,
                password: $scope.user.password,
                fullName: $scope.user.name
            })
                .success(function() {
                    //AUTH OK!
                    $scope.registerError = null;
                    $rootScope.user = $scope.user;
                    $rootScope.$emit('loggin');
                    $location.url('#/league-schedule');
                })
                .error(function(error) {
                    //AUTH FAILED!
                    $scope.registerError = error;
                });
        } else {
            $scope.registerError = "Passwords Don't Match"
        }
    };
});