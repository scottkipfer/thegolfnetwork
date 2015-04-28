angular.module('network-golf-controllers',[]).controller('golferController', function($scope){
    $scope.name = {};
    $scope.name.first = 'Scott'; // TODO need to get this from a service that plugs into the back end.
    $scope.name.last = 'Kipfer';


}).controller('MainController', function($scope, $rootScope, store, jwtHelper){
    $scope.state = '';
    var checkUserToken = function(){
        var user_token = store.get('token');
        if(user_token){
            var isExpired = jwtHelper.isTokenExpired(user_token);
            if(!isExpired){
                return true;
            } else {
                store.remove('token');
                return false;
            }
        } else {
            return false;
        }
    };
    $scope.loggedin = checkUserToken();
    $scope.menuIsOpen = false;

    $rootScope.$on('loggedin', function(){
        console.log('logged in!');
        $scope.loggedin = checkUserToken();
    });

    $rootScope.$on('stateChange',function(event,args){
        console.log(args.state);
        $scope.state = args.state;
    });

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
