// app.js
'use strict';

var app = angular.module('the-network-golf', [
    'angular-storage',
    'angular-jwt',
    'ui.bootstrap',
    'ui.router',
    'network-golf-controllers',
    'ngResource',
    'snap',
    'tng-login',
    'tng-schedule',
    'tng-courses'

])
    // Configure Routes for the application
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'jwtInterceptorProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, jwtInterceptorProvider , $httpProvider) {
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
            })
            .state('courses-view', {
                url:'/courses',
                templateUrl: 'course/views/create-course.html',
                controller:'courseController'
            })
            .state('course round by id', {
                url:'/courses/:courseId',
                templateUrl: 'course/views/course-view.html',
                controller: 'courseController'
            });

        jwtInterceptorProvider.tokenGetter = ['store', function(store) {
            return store.get('token');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');

        // Use Html 5 Mode
        $locationProvider.html5Mode({
            enabled: false
        });
    }])
    .run(function($rootScope, store, jwtHelper, $state) {
        // This events gets triggered on refresh or URL change
        $rootScope.$on('$stateChangeSuccess', function(event,toState) {
            console.log(toState.name);
               var token = store.get('token');
                console.log(token);
                if (token) {
                    if (!jwtHelper.isTokenExpired(token)) {
                        console.log('token is good');
                    } else {
                        // Either show Login page or use the refresh token to get a new idToken
                        console.log('token is expired');
                        if(toState.name !== 'login-view'){
                            $state.go('login-view',{reload:true});
                        }
                    }
                } else {
                    console.log('no token');
                    if(toState.name !== 'login-view'){
                        $state.go('login-view',{reload:true});
                    }
                }
        });
    });