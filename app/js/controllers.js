/**
 * Created by Brian on 1/8/2015.
 */
var mechMonControllers = angular.module('mechMonControllers', []);


mechMonControllers.controller('deviceListCtrl', ['$scope', '$http',
  function ($scope, $http) {

    // we have all of nav data in this controller object

    //$http.get('gate/gate.json').success(function(data) {
    //  $scope.gate = data;
    //});

    $scope.noItems = '1';
  }]);



mechMonControllers.controller('deviceDetailCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('device/device.json').success(function(data) {
      $scope.data = data;
    });


    $scope.deviceType = 'gate';
    $scope.description = 'gate';
    $scope.name = 'Custom Gate';
    $scope.model ='None';
    $scope.gateId = '1';
    $scope.gateLocation = 'Main Entrance';
    $scope.gateStatus = 'closed';
    // we will need to nest these properties,
  }]);


