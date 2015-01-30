// file:app/partials/deviceTypeList.js
//

//add these objects to controller
mechMonControllers.controller('ThermostatController', ['$scope', function ($scope)  {

  // Put all this stuff in an init() function
       $scope.displayImageUrl = "images/thermostat.jpg";
       $scope.name = "Thermostat";
       $scope.tstat= {
         actualTemperature: "81.26",
         units: "F" // or 'C'
       };

  $scope.tstat.actualTemperature = 0;
  setInterval(function() {
    //$("#testResizableArray").sevenSeg({ value: iArrayValue });

    if($scope.tstat.actualTemperature > 999) {
      $scope.tstat.actualTemperature = 0;
    }
    $scope.tstat.actualTemperature += 0.01;
  }, 50);



/*
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

      $scope.displayImageUrl = $scope.image.state2To1ImageUrl;

    return this;
};

  var openGateAnimate = function() {
      $scope.displayImageUrl = $scope.image.state1To2ImageUrl;

  };
*/
}]);