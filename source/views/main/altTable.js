angular.module('altTable', ['ngSanitize'])
    .directive('alttableRow', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                  if(scope.$parent[attrs.alttableTable].editBoxShow == false) { //???????? $parent?
                      scope.$apply(function () {
                        scope[attrs.alttableTable].selectRow(scope.row);
                      });
                  }
                });
                
                scope.$watch('row.isSelected', function (newValue, oldValue) {
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

          scope[alttable.name] = new function () {
             var thisRef = this;

             this.rows = [];
             this.selectMode = alttable.selectMode || 'single';

             this.setData = function(data) {
               thisRef.rows = []; //!!!!! это освободит память или надо на все строки явно вызывать destroy?

               angular.forEach(data, function(value, key){
                  //console.log('*');
                  var newRow = {
                     id: key,
                     isSelected: false,
                     data: value
                  };
                  thisRef.rows.push(newRow);
               });
             }

             //this.setData(scope[alttable.data]); - этот вызов логичен, но не нужен, т.к. watch срабатывает один раз при его инициализации
          }();

          scope.$watch(alttable.data, function(newValue, oldValue) {
             scope[alttable.name].setData(newValue);
          });

          scope[alttable.name].editBoxShow = false; //!!!!!!!!!!!!!! внутрь конструктора
          scope[alttable.name].editBoxMode = function(value) {
             scope[alttable.name].editBoxShow = value;
          };

          scope[alttable.name].selection = null; //!!!!!!!!!!!!!! внутрь конструктора
          scope[alttable.name].selectRow = function(value) {
             if (scope[alttable.name].selection != null) {
                scope[alttable.name].selection.isSelected = false;
             }

             scope[alttable.name].selection = value;
             value.isSelected = true;
  
             if (alttable.onSelect != null)
               scope[alttable.onSelect](scope[alttable.name].selection.data);
          };

        }
     };
    });
                       