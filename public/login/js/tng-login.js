// tng-login.js
'use strict';

var app = angular.module('tng-login', [
    'angular-storage',
    'auth0',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router'
]).controller('loginController', function($scope){
    $scope.title = "Login";
}).controller('forgotPasswordController', function($scope){
    $scope.title = "Forgot Password"
});