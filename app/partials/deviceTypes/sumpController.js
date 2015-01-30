// file:app/partials/deviceTypeList.js
//

//add these objects to controller
mechMonControllers.controller('SumpController', ['$scope','$timeout', function ($scope, $timeout)  {

  // Put all this stuff in an init() function
       $scope.displayImageUrl = "images/sump.jpg";
       $scope.name = "Sump Pump";
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