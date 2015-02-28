//angular.module('myTabsModule', ['ngSanitize'])
angular.module('myTabsModule', [])
  .directive('myTemplateDir', function() {
    return {
      restrict: 'E',
      controller: function($scope) {
        //console.log('myTemplateDir tolik='+$scope.tolik);
      },
      template:''+
        '<div ng-click="func1()">Inside directive template:<br> it is <b>html</b> <br> it is angular: {{tolik}}</div>'+
        '<my-tabs>'+
          '<my-pane ng-repeat="tab in mytabs" title="{{tab.title}}">'+
            '<div ng-include="tab.templateURL"></div>'+
            '<p>footer text</p>'+
          '</my-pane>'+
        '</my-tabs>'
    }
  })
  .controller('mainTabsController', ['$scope', '$sce', function($scope, $sce){
    $scope.mytabs = [
      {
        title: "Hello2",
        templateURL: 'panel-hello.html'
      },
      {
        title: "World2",
        templateURL: 'panel-world.html'
      }
      ];

    $scope.func1 = function() {
      alert('func1 call');
      $scope.tolik = "'mainController tolik (UPDATED)'";
      $scope.myTemplate2 = '<div ng-click="func1()">(UPDATED) it is <b>html</b> <br> it is angular: {{tolik}}</div>';
    };

    $scope.tolik = "'mainController tolik'";

    $scope.myTemplateURL = 'myTabsRepeaterTemplate.html';
  }])
  .directive('myTabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope) {
        var panes = $scope.panes = [];
        //console.log('myTabsController tolik='+$scope.tolik);
        //console.log($scope);

        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        };

        this.addPane = function(pane) {
          //console.log(panes.length);
          if (panes.length === 0) {
            $scope.select(pane);
          }
          panes.push(pane);
        };
      },
      templateUrl: 'my-tabs.html'
    };
  })
  .directive('myPane', function() {
    return {
      require: '^myTabs',
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@'
      },
      link: function(scope, element, attrs, tabsCtrl) {
        //console.log('myPaneLink tolik='+scope.tolik);
        //console.log(scope);
        scope.myPanel = {title:scope.title};
        tabsCtrl.addPane(scope.myPanel);
      },
      controller: function($scope) {
        $scope.myPanelByController = "cntrl";
        //console.log('myPaneController tolik='+$scope.tolik);
        //console.log($scope);
      },
      templateUrl: 'my-pane.html'
    };
  });
