angular.module('network-golf-controllers',[]).controller('golferController', function($scope){
    $scope.name = {};
    $scope.name.first = 'Scott'; // TODO need to get this from a service that plugs into the back end.
    $scope.name.last = 'Kipfer';


}).controller('MainController', function($scope){

    $scope.loggedin = true;
    $scope.menuIsOpen = false;

    $scope.open_menu = function(){
      if($scope.menuIsOpen === false){
          $scope.menuIsOpen = true;
      }else {
          $scope.menuIsOpen = false;
      }
    };
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
