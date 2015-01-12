/**
 * Created by Brian on 1/8/2015.
 */
var mechMonControllers = angular.module('mechMonControllers', []);



mechMonControllers.controller('AboutController', ['$scope',
  function ($scope) {
/*
    $('#navbar').BootstrapDialog.show({
        type: BootstrapDialog.TYPE_PRIMARY,
        title: 'Contact',
        message: "Moore Technical Services, LLC" + "\n" +
              "4001 S. Rockport Rd" + "\n" +
              "Bloomington, IN 47403" + "\n" +
              "823-322-6563" + "\n" +
              "Brian E. Moore, PE" + "\n" +
        "www.mooretechnicalservices.com"});
  */
  }
]);
mechMonControllers.controller('ContactController', ['$scope',
  function ($scope) {
    /*
    $('#navbar').BootstrapDialog.show({
      type: BootstrapDialog.TYPE_PRIMARY,
      title: 'Contact',
      message: "Moore Technical Services, LLC" + "\n" +
            "4001 S. Rockport Rd" + "\n" +
            "Bloomington, IN 47403" + "\n" +
            "823-322-6563" + "\n" +
            "Brian E. Moore, PE" + "\n" +
      "www.mooretechnicalservices.com"});
  */
    $scope.test = "Here";
  }]);
