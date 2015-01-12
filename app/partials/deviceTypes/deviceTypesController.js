// file:app/partials/deviceTypeList.js
//

//add these objects to controller
mechMonControllers.controller('DeviceTypesController', ['$scope',  function ($scope)  {
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
      "imageUrl": "images/tmp-9.gif",
      "orderSeq": "1"
    },
    {
      "typeId": "w-htr1",
      "description": "Water Heater",
      "name":"Wtr Htr",
      "label":"W Htr",
      "imageUrl": "images/hot-water-heater.jpg",
      "orderSeq": "1"
    },
    {
      "typeId": "furn-1",
      "deviceType":"3",
      "description": "furnace",
      "name":"Furnace",
      "label":"Furn",
      "imageUrl": "images/gas-furnace-1-edited.jpg",
      "orderSeq": "1"
    },
    {
      "typeId": "sump-1",
      "description": "sump pump",
      "name":"Sump Pump",
      "label":"Sump",
      "imageUrl": "images/sump.jpg",
      "orderSeq": "1"
    },
    {
      "typeId": "tstat-1",
      "description": "Thermostat",
      "name":"Thermostat",
      "label":"Tstat",
      "imageUrl": "images/thermostat.jpg",
      "orderSeq": "1"
    }
  ];


  $scope.defaultDeviceType = $scope.deviceTypes[0].typeId;
  $scope.deviceTypeImageUrl = $scope.deviceTypes[0].imageUrl; // change to  deviceTypes[].imageUrl
  $scope.name = " Front Gate";

/*
  $scope.onButtonOpenClick =  function(){
    //openGateAnimate();
    $.ajax({
      type: "POST",
      url: '/RelayK1On',
      data: "1",
      success: function(){ },// here we will change button colors
      dataType: "text"
    });
  };

  $scope.onButtonCloseClick = function(){
   // closeGateAnimate();
  $.ajax({
      type: "POST",
      url: '/RelayK1Off',
      data: "1",
      success: function(){},// here we will change button colors
      dataType: "text"
    });
  };

  $scope.onButtonHoldClick = function() {
  //openGateAnimate();
   $.ajax({
    type:     "POST",
    url:      '/RelayK1On-30s',
    data:     "1",
    success:  function () {
    },// here we will change button colors
    dataType: "text"
  });
};


  $scope.closeGateAnimate = function() {
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-9.gif");
  }, 1000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-8.gif");
  }, 2000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-7.gif");
  }, 3000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-6.gif");
  }, 4000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-5.gif");
  }, 5000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-5.gif");
  }, 10000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-6.gif");
  }, 11000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-7.gif");
  }, 12000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-8.gif");
  }, 13000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-9.gif");
  }, 14000);
};

  $scope.openGateAnimate = function() {
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-9.gif");
  }, 1000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-8.gif");
  }, 2000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-7.gif");
  }, 3000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-6.gif");
  }, 4000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-5.gif");
  }, 5000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-5.gif");
  }, 10000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-6.gif");
  }, 11000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-7.gif");
  }, 12000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-8.gif");
  }, 13000);
  setTimeout(function () {
    $("#gate-img").attr("src", "../images/tmp-9.gif");
  }, 14000);
};*/
}]);