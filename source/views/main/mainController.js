angular.module('BMSClient.views.main.mainController', ['BMSClient.views.main.uploadDocumentController', 'myTabsModule', 'altTable', 'baseModels'])
    /*    .factory('simpleFactory', function() {
     var factory = {};
     var customers = [{name:'tolik', i:4}, {name:'krolik', i:5}];
     factory.addCustomer = function(newCustomer) {
     customers.push(newCustomer);
     };
     factory.getCustomers = function() {
     return customers;
     };
     return factory;
     })*/
    /*.directive('stRatio',function(){
        return {
            link:function(scope, element, attr){
                var ratio=+(attr.stRatio);

                element.css('width',ratio+'%');

            }
        };
    })*/
    //.controller('rootController', ['$scope', 'simpleFactory', function($scope, simpleFactory) {
    .controller('mainController', function(app, $scope, $window, Request, RequestedService, ServiceTemplate, Document) {

        ////////////////////////////////////////////////////////////////////////////////

        $scope.app = app;

        //Инициализируем часть scope по UI-данным
        $scope.UI = {
            //serverConnectionStatus: app.locale.server.connectionInit, //Сразу пишем на экран, что начали устанавливать связь с сервером
            //activeAppView: {}
        };

        ////////////////////////////////////////////////////////////////////////////////

        $scope.mainTabsTemplateURL = "./source/views/main/mainTabsTemplate.html";

        $scope.mytabs = [
          {
            title: "Patient Requests",
            templateURL: "./source/views/main/requests.html"
          },
          {
            title: "Available Services",
            templateURL: "./source/views/main/services.html"
          },
          {
            title: "Cloud Storage Dashboard",
            templateURL: "./source/views/main/cloudStorageDashboard.html"
          },
          {
            title: "Cloud Storage Uploaded Files",
            templateURL: "./source/views/main/documents.html"
          },
          {
            title: "Upload Document",
            templateURL: "./source/views/main/uploadDocument.html"
          }
        ];

        ////////////////////////////////////////////////////////////////////////////////

        $scope.doLogout = function() {
          /*var modalWindowElement = angular.element(document.getElementById('myModal'));
          modalWindowElement.addClass('in');
          modalWindowElement.attr('style', 'display: block; padding-right: 17px;');
          document.getElementById('myModal').focus();*/
          //$("#myModal").modal("show");

          app.activeUser = null;
          $window.localStorage.removeItem('BMSClient.userIsLoggedIn');

          app.server.user.logout(function(data, status){
            if (status == 0) { // 0 - значит сервер не отвечает
                $scope.myModal = {
                   title: "Сервер не отвечает", //!!!!!!!!!!!!!
                   body: "Сервер не отвечает"
                };
                //$scope.UI.serverConnectionStatus = $filter("printf")(app.locale.server.notRespond, app.settings.server.host);
                $("#myModal").modal("show");
                return; //выходим из функции
            }

            if (status == 200) { // 200 - значит пользователь разлогинен
                var activeAppViewURL = './source/views/welcome/welcome.html';
                $scope.$parent.UI.activeAppView.url = activeAppViewURL;
            }
            else {
                $scope.myModal = {
                   title: "Сервер возвратил ошибку", //!!!!!!!!!!!!!
                   body: data
                };
                //$scope.UI.serverConnectionStatus = $filter("printf")(app.locale.server.notRespond, app.settings.server.host);
                $("#myModal").modal("show");
                return; //выходим из функции
            }

          });
        };

        ////////////////////////////////////////////////////////////////////////////////

        Document.query({}, function (data) {
           $scope.documents = data;
        });

        ////////////////////////////////////////////////////////////////////////////////

        ServiceTemplate.query({}, function (data) {
           $scope.serviceTemplates = data;
        });

        ////////////////////////////////////////////////////////////////////////////////

        Request.query({owner:app.activeUser.id}, function (data) {
           $scope.requests = data;

        });

        $scope.getServiceTemplateById = function (id) {
           for (i = 0; i < $scope.serviceTemplates.length; i++) {
              if ($scope.serviceTemplates[i].id == id)
                return $scope.serviceTemplates[i];
           };
           return null;
        };

        $scope.onRequestSelect = function (request) {
           RequestedService().query({parentRequest: request.id}, function(requestedServices){

             angular.forEach(requestedServices, function(value, key) {
                value.baseService = $scope.getServiceTemplateById(value.baseService);
             });

             $scope.requestedServices = requestedServices; 
           });
        };

        ////////////////////////////////////////////////////////////////////////////////

        //document.getElementById('loginEditBox').focus();

        //Если пользователь до этого нажал Logout, но на сервер команда не дошла,
        //то, чтобы нельзя было увидеть предыдущую сессию, сначала повторям Logout (без проверки сессии на сервере для уменьшения кода)
        //if (userIsLoggedIn == null)
        //    app.server.user.logout(function(){});

        //Проверяем связь с сервером и заодно проверяем залогинены ли мы на сервере
        /*app.server.user.getActiveUser(function(data, status, h,c) {
            if (status == 0) { // 0 - значит сервер не отвечает
                $scope.UI.serverConnectionStatus = $filter("printf")(app.locale.server.notRespond, app.settings.server.host);
                return; //выходим из функции, иначе ниже скрин будет переключен на view по-умолчанию, т.е. на welcome
            }

            var activeAppViewURL = './source/views/welcome/welcome.html'; //по-умолчанию отправляем пользователя на скрин логина

            if (status == 403) { // 403 - значит пользователь НЕ залогинен
                //ничего не меняет, отправляем пользователя на скрин логина
                //activeAppViewURL = './source/views/welcome/welcome.html';
            }

            if (status == 200) { // 200 - значит пользователь залогинен
                app.activeUser = data;
                activeAppViewURL = './source/views/main/main.html';
            }

            //$timeout(function () { //меняем view через таймер, иначе смена происходит еще до полной загрузки всех компонет типа animation, который вообще не то, что не работает, а даже не успевает запуститься
                $scope.UI.activeAppView.url = activeAppViewURL;
            //}, 1);
            $timeout(function () {
                $scope.UI.activeAppView.show = true; // этот параметр отдельно от url только для того, чтобы animation по затемнению старого успела сработать, иначе новый appView уже появляется ниже appLoading
            }, 500);
        });*/

        //$window.localStorage.setItem('BMSClient.userIsLoggedIn', true);
    });
