// file:app/partials/deviceTypeList.js
//

//add these objects to controller
mechMonControllers.controller('MasterController', ['$scope','$timeout', function ($scope, $timeout)  {
$scope.name = "*MASTER*";
  $scope.devices =  [
    {
      "id": "gate-1",
      "typeId":"gate-1",
      "model":"None",
      "serialNo":"None",
      "room":"1"
    },
    {
      "id": "w-htr1",
      "typeId":"w-htr1",
      "model":"None",
      "serialNo":"None",
      "room":"1"
    },
    {
      "id": "furn-1",
      "typeId":"furn-1",
      "model":"None",
      "serialNo":"None",
      "room":"1"
    },
    {
      "id": "sump-1",
      "typeId": "sump-1",
      "model":"None",
      "serialNo":"None",
      "room":"1"
    },
    {
      "id": "tstat-1",
      "typeId": "tstat-1",
      "model":"None",
      "serialNo":"None",
      "room":"1"
    }
  ];
// I want to use this array or object to load everything into route dynamically
  $scope.deviceTypes =  [
    {
      "typeId": "gate",
      "description": "gate",
      "name":"Front Gate",
      "label":"Gate",
      "template": "gate.html",
      "defaultStateImageUrl": "images/gate_closed.gif",
      "animated": "true",
      "images":{
        "state1ImageUrl": "images/gate_closed.gif",//"images/tmp-9.gif",
        "state2ImageUrl":"images/tmp-4.gif",
        "state2To1ImageUrl":"images/gate_closing.gif",
        "state1To2ImageUrl":"images/gate_opening.gif" },
      "orderSeq": "1"
    },
    {
      "typeId": "w-htr",
      "description": "Water Heater",
      "name":"Wtr Htr",
      "label":"W Htr",
      "template": "hot-water-heater.html",
      "defaultStateImageUrl": "images/hot-water-heater.jpg",
      "animated": "true",
      "orderSeq": "1"
    },
    {
      "typeId": "furn",
      "description": "furnace",
      "name":"Furnace",
      "label":"Furn",
      "template": "furnace.html",
      "defaultStateImageUrl": "images/gas-furnace-1-edited.jpg",
      "animated": "true",
      "orderSeq": "1"
    },
    {
      "typeId": "sump",
      "description": "sump pump",
      "name":"Sump Pump",
      "label":"Sump",
      "template": "sump.html",
      "defaultStateImageUrl": "images/sump.jpg",
      "animated": "true",
      "orderSeq": "1"
    },
    {
      "typeId": "tstat",
      "description": "Thermostat",
      "name":"Thermostat",
      "label":"Tstat",
      "template": "thermostat.html",
      "defaultStateImageUrl": "images/thermostat.jpg",
      "animated": "true",
      "orderSeq": "1"
    }
  ];







}]);