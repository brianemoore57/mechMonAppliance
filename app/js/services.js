/**
 * Created by Brian on 1/9/2015.
 */
var mechMonServices = angular.module('mechMonServices', ['ngResource']);

mechMonServices.factory('DevicesTypes', ['$resource',
  function($resource){
    return $resource('/server/api/devices/', {}, {
      query: {method:'GET', isArray:true}

    });


  }]);

mechMonServices.factory('Devices', ['$resource',
  function($resource){
    return $resource('/server/api/deviceTypes', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
