/**
 * Created by Brian on 1/9/2015.
 */
var mechMonServices = angular.module('mechMonServices', ['ngResource']);

mechMonServices.factory('DevicesData', ['$resource',
  function($resource){
    return $resource('/api/devices', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
/*
mechMonServices.factory('DeviceData', ['$resource',
  function($resource){
    return $resource('api/:device.json', {}, {
      query: {method:'GET', params:{deviceId:'deviceTypes'},
        isArray:true}
    });
  }]);
*/
mechMonServices.factory('DeviceTypesData', ['$resource',
  function($resource){
    return $resource('/server/api/deviceTypes', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
/*
mechMonServices.factory('DeviceTypeData', ['$resource',
  function($resource){
    return $resource('api/:deviceType.json', {}, {
      query: {method:'GET', params:{deviceType:'devices'},
        isArray:true}
    });
  }]);

  */