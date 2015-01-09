/**
 * Created by Brian on 1/8/2015.
 */
var mechMonControllers = angular.module('mechMonControllers', []);

mechMonControllers.controller('gateDetailCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('gate/gate.json').success(function(data) {
      $scope.gate = data;
    });

    $scope.deviceType = 'gate';
    $scope.gateId = '1';
    $scope.gateLocation = 'Main Entrance';
    $scope.gateStatus = 'closed';
    // we will need to nest these properties,
  }]);

mechMonControllers.controller('sumpDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams)
  {

    $scope.deviceType = 'sump';
    $scope.sumpId = $routeParams.sumpId;
    $scope.sumpModelNo = $routeParams.sumpModelNo;
    $scope.sumpId = $routeParams.sumpId;
    $scope.sumpId = $routeParams.sumpId;

  }]);
mechMonControllers.controller('w-heaterDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams)
  {

    $scope.deviceType = 'water heater';
    $scope.sumpId = $routeParams.sumpId;
    $scope.sumpModelNo = $routeParams.sumpModelNo;
    $scope.sumpId = $routeParams.sumpId;
    $scope.sumpId = $routeParams.sumpId;

  }]);

mechMonControllers.controller('thermostatDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams)
  {
    $scope.deviceType = 'thermostat';
    $scope.sumpId = $routeParams.sumpId;
    $scope.sumpModelNo = $routeParams.sumpModelNo;
    $scope.sumpId = $routeParams.sumpId;
    $scope.sumpId = $routeParams.sumpId;

  }]);
mechMonControllers.controller('furnaceDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams)
  {
    $scope.deviceType = 'furnace';
    $scope.sumpId = $routeParams.sumpId;
    $scope.sumpModelNo = $routeParams.sumpModelNo;
    $scope.sumpId = $routeParams.sumpId;
    $scope.sumpId = $routeParams.sumpId;

  }]);

