// file:app/partials/furnController.js
//

//add these objects to controller
mechMonControllers.controller('FurnController', ['$scope','$timeout', function ($scope, $timeout)  {

  // Put all this stuff in an init() function
      $scope.name = "Furnace";
      $scope.displayImageUrl = "images/gas-furnace.jpg";

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
    var nextImage = $scope.deviceTypes[$scope.activeItem].images.state2To1ImageUrl;

    if ($scope.deviceTypes[$scope.activeItem].animated && nextImage != $scope.displayImageUrl)
    {
      //$scope.visibility="hidden";
      $scope.displayImageUrl = nextImage;
      //$scope.visibility="visible";
    }
   // probably need time delay here for chaining to be effective
    return this;
};

  var openGateAnimate = function() {
    var nextImage = $scope.deviceTypes[$scope.activeItem].images.state1To2ImageUrl;
    if ($scope.deviceTypes[$scope.activeItem].animated &&  nextImage != $scope.displayImageUrl)
    {
      //$scope.visibility="hidden";
      $scope.displayImageUrl = nextImage;
      //$scope.visibility="visible";
    }
    // probably need time delay here for chaining to be effective
    return this;
  };
*/
}]);
