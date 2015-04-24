// tng-login.js
'use strict';

var app = angular.module('tng-login', [
    'angular-storage',
    'auth0',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router'
]).controller('loginController', function($scope, $rootScope, $http, store, jwtHelper, $state){
    $scope.title = "Login";
    $scope.user = {};

    //TODO make a service
    var checkUserToken = function(){
        var user_token = store.get('token');
        if(user_token){
            var isExpired = jwtHelper.isTokenExpired(user_token);
            if(!isExpired){
                $state.go('schedule-view');
            } else {
                $scope.user.email = jwtHelper.decodeToken(user_token).user.email;
                console.log($scope.user.email);
            }
        }
    };
    checkUserToken();



    $scope.login = function(){
        $http.post('/signin', {
            username:$scope.user.email,
            password:$scope.user.password
        })
        .success(function(response) {
            //AUTH OK!
            if(response.token){
                store.set('token', response.token);
                checkUserToken();
            }
            $scope.loginError = 0;
        })
        .error(function(){
            $scope.loginerror = 'Authentication failed';
        });
    };

}).controller('forgotPasswordController', function($scope){
    $scope.title = "Forgot Password";
}).controller('signupController', function($scope, $rootScope, $http, $state, jwtHelper, store){
    $scope.title = "Sign Up";
    $scope.user = {};

    var checkUserToken = function(){
        var user_token = store.get('token');
        if(user_token){
            var isExpired = jwtHelper.isTokenExpired(user_token);
            if(!isExpired){
                $state.go('schedule-view');
            } else {
                store.remove('token');
            }
        }
    };
    checkUserToken();

    $scope.signup = function() {
         $scope.usernameError = null;
         $scope.registerError = null;

        if($scope.user.password === $scope.user.confirm_password){
            $http.post('/signup', {
                email: $scope.user.email,
                password: $scope.user.password,
                fullName: $scope.user.name
            })
                .success(function(response) {
                    //AUTH OK!
                    if(response.token){
                        store.set('token', response.token);
                        checkUserToken();
                    }
                    $scope.registerError = null;

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