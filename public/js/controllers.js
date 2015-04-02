angular.module('network-golf-controllers',[]).controller('golferController', function($scope){
    $scope.name = {};
    $scope.name.first = 'Scott'; // TODO need to get this from a service that plugs into the back end.
    $scope.name.last = 'Kipfer';


}).controller('golferListController', function($scope){
    $scope.getAllGolfers = function(){
      //return golferService.getAllGolfers(); todo
        return [{
            name: {
                first: 'Scott',
                last: 'Kipfer'
            },
            id : 1,
            permalink: "scott-kipfer"
         }, {
            name: {
                first: 'Matt',
                last: 'Shugars'
            },
            id : 2,
            permalink: "matt-shugars"
        }]
    };

    $scope.golfers = $scope.getAllGolfers();

});
