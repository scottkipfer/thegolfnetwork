// app.js
'use strict';

var app = angular.module('the-network-golf', [
    'angular-storage',
    'auth0',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router',
    'network-golf-controllers',
    'ngResource',
    'tng-login',
    'tng-schedule'
])
    // Configure Routes for the application
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('golfer-list-view', {
                url: "/golfer-list",
                templateUrl: 'views/golfer-list-view.html',
                controller: 'golferListController'
            })
            .state('golfer-view',{
                url:'/golfer',
                templateUrl: 'views/golfer-view.html',
                controller: 'golferController'
            })
            .state('login-view',{
                url:'/signin',
                templateUrl: 'login/views/login.html',
                controller: 'loginController'
            })
            .state('forgot-password',{
                url:'/forgot-password',
                templateUrl: 'login/views/forgot-password.html',
                controller: 'forgotPasswordController'
            })
            .state('schedule-view', {
                url:'/league-schedule',
                templateUrl: 'schedule/views/schedule-view.html',
                controller: 'scheduleController'
            })
            .state('league round by id', {
                url:'/league-round/:leagueroundId',
                templateUrl: 'schedule/views/league-round-view.html',
                controller: 'scheduleController'
            })
            .state('sign-up-view', {
                url:'/signup',
                templateUrl: 'login/views/signup.html',
                controller:'signupController'
            });

        // Use Html 5 Mode
        $locationProvider.html5Mode({
            enabled: false
        });
    }]);