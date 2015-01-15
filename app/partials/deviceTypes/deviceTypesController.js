// file:app/partials/deviceTypeList.js
//

//add these objects to controller
mechMonControllers.controller('DeviceTypesController', ['$scope','$timeout', function ($scope, $timeout)  {
  var defaultType = 0;
  //    $scope.devices = Devices.query();


  //$scope.deviceTypes = DeviceTypes.query();
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

  $scope.deviceTypes =  [
    {
      "typeId": "gate1",
      "description": "gate",
      "name":"Front Gate",
      "label":"Gate",
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
      "typeId": "w-htr1",
      "description": "Water Heater",
      "name":"Wtr Htr",
      "label":"W Htr",
      "defaultStateImageUrl": "images/hot-water-heater.jpg",
      "animated": "true",
      "orderSeq": "1"
    },
    {
      "typeId": "furn-1",
      "deviceType":"3",
      "description": "furnace",
      "name":"Furnace",
      "label":"Furn",
      "defaultStateImageUrl": "images/gas-furnace-1-edited.jpg",
      "animated": "true",
      "orderSeq": "1"
    },
    {
      "typeId": "sump-1",
      "description": "sump pump",
      "name":"Sump Pump",
      "label":"Sump",
      "defaultStateImageUrl": "images/sump.jpg",
      "animated": "true",
      "orderSeq": "1"
    },
    {
      "typeId": "tstat-1",
      "description": "Thermostat",
      "name":"Thermostat",
      "label":"Tstat",
      "defaultStateImageUrl": "images/thermostat.jpg",
      "animated": "true",
      "orderSeq": "1"
    }
  ];

  // Put all this stuff in an itit() function

  $scope.activeItem =  Number(0);
  $scope.defaultDeviceType = $scope.deviceTypes[$scope.activeItem].typeId;
  $scope.displayImageUrl = $scope.deviceTypes[$scope.activeItem].defaultStateImageUrl;
  $scope.name = $scope.deviceTypes[$scope.activeItem].name;
  $scope.visibility = "visible";

  $scope.setActiveMenuItem =  function(item){ // menu choices set menu item
    {

       $scope.activeItem = item;
      $scope.displayImageUrl = $scope.deviceTypes[$scope.activeItem].defaultStateImageUrl;
    }
  };

    $scope.onButtonOpenClick =  function(){
     openGateAnimate();
     $timeout(closeGateAnimate,8000); // $timeout is an AngularJS wrapper

    $.ajax({
      type: "POST",
      url: '/RelayK1On-30s',
      data: "1",
      success: function(){ },// here we will change button colors
      dataType: "text"
    });
  };

  $scope.onButtonCloseClick = function(){
    closeGateAnimate();
  $.ajax({
      type: "POST",
      url: '/RelayK1Off',
      data: "1",
      success: function(){},// here we will change button colors
      dataType: "text"
    });
  };

  $scope.onButtonHoldClick = function() {
     openGateAnimate();
   $.ajax({
    type:     "POST",
    url:      '/RelayK1On',
    data:     "1",
    success:  function () {
    },// here we will change button colors
    dataType: "text"
  });
};

  //"state1ImageUrl": "images/tmp-9.gif",
  //  "state2ImageUrl":"images/tmp-4.gif",
  var closeGateAnimate = function() {
    var nextImage = $scope.deviceTypes[$scope.activeItem].images.state2To1ImageUrl;

    if ($scope.deviceTypes[$scope.activeItem].animated && nextImage != $scope.displayImageUrl)
    {
      $scope.visibility="hidden";
      $scope.displayImageUrl = nextImage;
      $scope.visibility="visible";
    }
   // probably need time delay here for chaining to be effective
    return this;
};

  var openGateAnimate = function() {
    var nextImage = $scope.deviceTypes[$scope.activeItem].images.state1To2ImageUrl;
    if ($scope.deviceTypes[$scope.activeItem].animated &&  nextImage != $scope.displayImageUrl)
    {
      $scope.visibility="hidden";
      $scope.displayImageUrl = nextImage;
      $scope.visibility="visible";
    }
    // probably need time delay here for chaining to be effective
    return this;
  };

}]);