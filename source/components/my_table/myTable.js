angular.module('myTable', [])
    .directive("outsideClick", ['$document', function($document){
      return {
        link: function( $scope, $element, $attributes ){
            var scopeExpression = $attributes.outsideClick,
                onDocumentClick = function(event){
                    var isChild = $element.find(event.target).length > 0;

                    if(!isChild) {
                        $scope.$apply(scopeExpression);
                    }
                };

            $document.on("click", onDocumentClick);

            $element.on('$destroy', function() {
                $document.off("click", onDocumentClick);
            });
        }
      }
    }])
    .directive('alttableField', function ($compile, $parse, $timeout) {
        return {
            restrict: 'A',
            scope: { //!!!!! убрать, чтобы ниже по коду не было везде scope.$parent !!!!
                table: '@alttableTable',
                rowId: '=alttableRowId',
                field: '@alttableField'
            },
            link: function (scope, element, attrs) {
                console.log('linkCell');

                //scope.$parent.editBoxHide = false;
                //scope.$parent.origHtml = element.html();

                //element.html("<b ng-click='"+scope.table+".editCell()'>"+element.html()+"</b>");
                element.html("<b ng-show___='!"+scope.table+".editBoxShow' ng-click='editCell()'>"+element.html()+"</b>");
                $compile(element.contents())(scope.$parent);

                //scope.$parent.$parent[scope.table].editCell = function () {
                scope.$parent.editCell = function () {
                    console.log('editCell');
                    //console.log(element);

                    if (scope.$parent.$parent[scope.table].editBoxShow == false) {
                      console.log(scope.$parent.$parent[scope.table].editBoxShow);
                      scope.$parent.$parent[scope.table].editBoxMode(true);
                      console.log(scope.$parent.$parent[scope.table].editBoxShow);

                      element.children().addClass('alttable-hide');

                      element.append("<div id='editDiv' ng-show='"+scope.table+".editBoxShow'><input id='editBox' class='form-control' ng-model='"+scope.table+".rows["+scope.rowId+"].data."+scope.field+"' ng-blur='onEditExitCell()'></div>");
                      $compile(element.contents())(scope.$parent);

                      $timeout(function(){
                         document.getElementById('editBox').focus();
                      }, 10);
                    }
                    //ctrl.selectRow();
                };

                scope.$parent.onEditExitCell = function () {
                    console.log('onEditExitCell');

                    //scope.$apply(function () {
                      $timeout(function(){ //!!!!!!!!!!!!????????? Нужен ли timeout?
                        scope.$parent.$parent[scope.table].editBoxMode(false);
                        document.getElementById('editDiv').remove();
                        element.children().removeClass('alttable-hide');
                      },  10);
                    //});
                };

                //console.log(scope.$parent.$parent);

                //element.bind('click', function () {
                //    console.log('myDblClick');
                //});
            }
        };
    })
    .directive('alttableRow', function () {
        return {
            restrict: 'A',
            //scope: {
            //    row: '=alttableRow'
            //},
            link: function (scope, element, attrs) {
                //console.log(scope.row);
                //element.bind('dblclick', function () {
                //    console.log('myDblClick');
                //});
                //scope.selectRow = function() {
                //   scope.row.isSelected = !scope.row.isSelected;
                //};

                element.bind('click', function () {
                  if(scope.$parent[attrs.alttableTable].editBoxShow == false) { //???????? $parent?
                      console.log('myClick');

                      console.log(scope.row);
                      scope.$apply(function () {
                        //ctrl.select(scope.row, mode);
                        scope[attrs.alttableTable].selectRow(scope.row);
                      });
                  }
                });
                
                scope.$watch('row.isSelected', function (newValue, oldValue) {
                    //console.log('myWatch: ' + newValue + " | old: " + newValue);
                    //console.log(scope.row);
                    if (newValue == true) {
                        element.addClass('alttable-selected-row');
                    } else {
                        element.removeClass('alttable-selected-row');
                    }
                }); 
            }
        };
    })
    .directive('alttable', function() {
      return {
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {
          var alttable = JSON.parse(attrs.alttable);

          element.addClass(alttable.class);

          //TODO: !!!!! watch alttable.data

          scope[alttable.name] = new function () {
             this.rows = [];
             this.selectMode = alttable.selectMode || 'single';
             var thisRef = this;
             angular.forEach(scope[alttable.data], function(value, key){
                var newRow = {
                     id: key,
                     isSelected: false,
                     data: value
                };
                thisRef.rows.push(newRow);
             });
          }();

          scope[alttable.name].editBoxShow = false; //!!!!!!!!!!!!!! внутрь конструктора
          scope[alttable.name].editBoxMode = function(value) {
             scope[alttable.name].editBoxShow = value;
          };

          scope[alttable.name].selection = null; //!!!!!!!!!!!!!! внутрь конструктора
          scope[alttable.name].selectRow = function(value) {
             console.log('selectRow: '+value.id);
             if (scope[alttable.name].selection != null) {
                scope[alttable.name].selection.isSelected = false;
             }
             scope[alttable.name].selection = value;
             value.isSelected = true;
          };

        }

        //$scope.rowI = 1;
        //$scope.getrowI = function(){
        //    $scope.rowI = $scope.rowI + 1;
        //    console.log($scope.rowI);
        //    return $scope.rowI;
        //}

        /*
        $scope.func = function(row){
            console.log(row);
            row.isSelected = !row.isSelected;
        }

        $scope.func2 = function(row){
            console.log(row);
            row.inEdit = true;//!row.inEdit;
        }
        */
     };
    });
                       