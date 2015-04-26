'use strict';

var app = angular.module('tng-courses', [
    'angular-storage',
    'angular-jwt',
    'ui.router'
]).factory('Courses', ['$resource', function($resource) {
    return $resource('courses/:courseId', {
        courseId:'@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]).factory('Tees', ['$resource', function($resource) {
    return $resource('tees/:courseId', {
        courseId:'@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]).controller('courseController', [
    '$scope',
    '$stateParams',
    '$location',
    'Courses',
    'jwtHelper',
    'store',
    '$state',
    'Tees',
    function($scope, $stateParams, $location, Courses, jwtHelper, store, $state, Tees){
        $scope.title = "Courses";
        $scope.courses = [];
        $scope.tees =[];
        $scope.number_of_holes = 9;
        $scope.holes = [];

        var createHoles = function(holes_array, length){
            var new_holes_array =[];
            for(var i = 0;i<length;i++) {
                new_holes_array[i] = {
                    number: i+1,
                    par: '',
                    yardage: '',
                    handicap: ''
                };
            }
            if(holes_array.length){
                for(i =0;i<holes_arry.length && i<new_holes_array.length;i++){
                    new_holes_array[i] = holes_array[i];
                }
            }
            return new_holes_array;
        };

        $scope.holes = createHoles($scope.holes, $scope.number_of_holes);
        $scope.create = function() {
            var course = new Courses({
                name: this.course.name,
                address: this.course.address,
                city: this.course.city,
                state: this.course.state,
                zipcode: this.course.zipcode
            });

            console.log(course);
            course.$save(function(){
                $scope.find();
            });
        };

        $scope.create_tee = function() {

            this.tee.holes = $scope.holes;
            console.log(this.tee.holes);
            console.log('Course ID for adding Tee: '+this.course._id);


            var tee = new Tees({
                name: this.tee.name,
                course: this.course._id,
                holes: this.tee.holes,
                slope: this.tee.slope,
                rating: this.tee.rating
            });

            console.log(tee);
            tee.$save(function(){
                $scope.findOne();
            });
        };

        $scope.find = function() {
            Courses.query(function(courses){
                $scope.courses = courses;
            });
        };

        $scope.findOne = function() {
            Courses.get({
                courseId: $stateParams.courseId
            }, function(course){
                Tees.query({
                    courseId: course._id
                },function(tees){
                    console.log(tees);
                    $scope.tees = tees;
                });
                console.log(course);
                $scope.course = course;
            });
        };

    }]);