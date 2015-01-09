/**
 * Created by Brian on 1/8/2015.
 */
var mechMonApp = angular.module('mechMonApp', [
  'ngRoute',
  'mechMonControllers'
]);
mechMonApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/gate/gateId', {
        templateUrl: 'partials/gateDetail.html',
        controller: 'gateDetailCtrl'
      }).
      when('/sump/:sumpId', {
        templateUrl: 'partials/sumpDetail.html',
        controller: 'sumpDetailCtrl'
      }).
      when('/w-heater/:w-heaterId', {
        templateUrl: 'partials/w-heaterDetail.html',
        controller: 'w-heaterDetailCtrl'
      }).
      when('/furnace/:furnaceId', {
        templateUrl: 'partials/furnaceDetail.html',
        controller: 'furnaceDetailCtrl'
      }).
      when('/thermostat/:furnaceId', {
        templateUrl: 'partials/furnaceDetail.html',
        controller: 'furnaceDetailCtrl'
      }).
      otherwise({
        redirectTo: '/gate'
      });
  }]);