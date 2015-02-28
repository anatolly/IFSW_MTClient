//angular.module('myTabsModule', ['ngSanitize'])
angular.module('myTabsModule', [])
  .directive('myTabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope) {
        var panes = $scope.panes = [];

        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        };

        this.addPane = function(pane) {
          if (panes.length === 0) {
            $scope.select(pane);
          }
          panes.push(pane);
        };
      },
      templateUrl: './source/views/main/myTabsTabs.html'
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
        scope.myPanel = {title:scope.title};
        tabsCtrl.addPane(scope.myPanel);
      },
      controller: function($scope) {
        $scope.myPanelByController = "cntrl";
      },
      templateUrl: './source/views/main/myTabsPane.html'
    };
  });
