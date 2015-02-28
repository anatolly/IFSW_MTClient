//angular.module('myBindsModule', ['ngSanitize'])
angular.module('myBindsModule', [])
  .directive('altBindHtml', function($compile, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.$watch(attrs.altBindHtml, function(newValue, oldValue) {
          var newElement = angular.element($parse(attrs.altBindHtml)(scope));
          $compile(newElement)(scope);
          //element.replaceWith($parse(attrs.content)(scope)); // - replaceWith не работает, замена из двух операций:
          element.html("");
          element.append(newElement);

          //OR
          //element.html($parse(attrs.altBindHtml)(scope));
          //$compile(element.contents())(scope);
        });
      }
    }
  })
  .directive('simpleBindHtml', function($compile, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        //scope.$watch(attrs.altBindHtml, function(newValue, oldValue) {
          //var newElement = angular.element($parse(attrs.altBindHtml)(scope));
          var newElement = angular.element(attrs.simpleBindHtml);
          $compile(newElement)(scope);
          //element.replaceWith($parse(attrs.content)(scope)); // - replaceWith не работает, замена из двух операций:
          element.html("");
          element.append(newElement);

          //OR
          //element.html($parse(attrs.altBindHtml)(scope));
          //$compile(element.contents())(scope);
        //});
      }
    }
  })
  .controller('mainBindsController', ['$scope', '$sce', function($scope, $sce){
    $scope.func1 = function() {
      alert('func1 call');
      $scope.tolik = "'mainController tolik (UPDATED)'";
      $scope.myTemplate2 = '<div ng-click="func1()">(UPDATED) it is <b>html</b> <br> it is angular: {{tolik}}</div>';
    };
    
    $scope.tolik = "'mainController tolik'";
    
    //$scope.myTemplate = $sce.trustAsHtml('<div ng-click="func1()">it is <b>html</b> <br> it is angular: {{tolik}}</div>');
    $scope.myTemplate2 = '<div ng-click="func1()">it is <b>html</b> <br> it is angular: {{tolik}}</div>';
  }]);
