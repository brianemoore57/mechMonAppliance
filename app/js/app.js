
/**
 * Created by Brian on 1/8/2015.
 */
"use strict";
var mechMonApp = angular.module('mechMonApp', [
  'ngRoute',
//  'mechMonServices',
  'mechMonControllers','mechMonDirectives'
]);
// I think being too abstract here might work against us..
// We are assuming Room 1 right now
// '/deviceType' route will construct a menu of device types to peruse
// '/deviceType:deviceTypeId' route will select a choice of deviceType and display as much as poss
// '/devices' route will show a list of all devices configured
// '/devices/:deviceId' route will 'drill' down to show all data on device

mechMonApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/master/master.html',
        controller: 'MasterController'
      }).
      when('/about', {
        templateUrl: 'partials/about/about.html',
        controller: 'AboutController'
      }).
      when('/contact', {
        templateUrl: 'partials/contact/contact.html',
        controller: 'ContactController'
      }).
      when('/reports', {
        templateUrl: 'partials/reports/reports.html',
        controller: 'ReportsController'
      }).
      when('/diagnostics', {
        templateUrl: 'partials/diagnostics/diagnostics.html',
        controller: 'DiagnosticsController'
      }).
      when('/customer', {
        templateUrl: 'partials/customer/customer.html',
        controller: 'CustomerController'
      }).
      when('/connection', {
        templateUrl: 'partials/connection/connection.html',
        controller: 'ConnectionController'
      }).
      when('/keys', {
        templateUrl: 'partials/keys/keys.html',
        controller: 'KeysController'
      }).
      when('/gate', {
        templateUrl: 'partials/deviceTypes/gate.html',
        controller: 'GateController'
      }).
      when('/w-htr', {
        templateUrl: 'partials/deviceTypes/w-htr.html',
        controller: 'W-htrController'
      }).
      when('/furn', {
        templateUrl: 'partials/deviceTypes/furn.html',
        controller: 'FurnController'
      }).
      when('/sump', {
        templateUrl: 'partials/deviceTypes/sump.html',
        controller: 'SumpController'
      }).
      when('/tstat', {
        templateUrl: 'partials/deviceTypes/thermostat.html',
        controller: 'ThermostatController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);