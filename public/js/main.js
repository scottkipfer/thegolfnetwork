// app.js
'use strict';

var app = angular.module('the-network-golf', [
    'angular-storage',
    'auth0',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router',
    'network-golf-controllers'
])
    // Configure Routes for the application
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('golfer-list-view', {
                url: "/golfer-list",
                templateUrl: 'views/golfer-list-view.html',
                controller: 'golferListController'
            })
            .state('golfer-view',{
                url:'/golfer-view',
                templateUrl: 'views/golfer-view.html',
               controller: 'golferController'
            });
        // Use Html 5 Mode
        $locationProvider.html5Mode({
            enabled: true
        });
    }]);