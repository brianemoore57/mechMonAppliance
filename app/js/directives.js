/**
 * File: directives.js
 * Project:
 * Framework: angularjs
 * Created by Brian on 1/28/2015.
 * This (first) directive is to adapt sevenSeg.js jquery-ui widget to angular
 * See these related articles:
 * https://amitgharat.wordpress.com/2013/02/03/an-approach-to-use-jquery-plugins-with-angularjs/
 * http://henriquat.re/directives/advanced-directives-combining-angular-with-existing-components-and-jquery/angularAndJquery.html
 */
var mechMonDirectives = angular.module('mechMonDirectives', []);

  mechMonDirectives.directive('digitalDisplay', function($parse) {
  return {
    restrict: 'EA',// Restrict it to be an attribute in this case, NO
    replace: false,
    transclude: false,
    compile: function compile(element, attrs) {

      $(element).sevenSeg({
        digits:       3,
        decimalPoint: true,
        value:        '70.0',
        colorOff:     "#003200",
        colorOn:      "Lime",
        slant:        10
      });
    },

    link: function (scope, element, attrs) {
      var modelAccessor = $parse(attrs.ngModel.tstat.actualTemperature);

      scope.$watch(modelAccessor, function (newVal, oldVal, scope) {
        $(element).sevenSeg({value: newVal}), true; // added true
      });
    }
  };
});

