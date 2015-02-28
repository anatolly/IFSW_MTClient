angular.module('BMSClient.views.welcome.welcomeController', [])
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
    .controller('welcomeController', function($scope, app, $timeout, $window) {

        $scope.app = app;

        $scope.password = "";
        $scope.login = "";
        var lastLogin = $window.localStorage.getItem('BMSClient.lastLogin');
        if (lastLogin != null)
          $scope.login = lastLogin;

        //Инициализируем часть scope по UI-данным
        $scope.UI = {
            //serverConnectionStatus: app.locale.server.connectionInit, //Сразу пишем на экран, что начали устанавливать связь с сервером
            //activeAppView: {}
        };

        $scope.doLogin = function() {
          /*var modalWindowElement = angular.element(document.getElementById('myModal'));
          modalWindowElement.addClass('in');
          modalWindowElement.attr('style', 'display: block; padding-right: 17px;');
          document.getElementById('myModal').focus();*/
          //$("#myModal").modal("show");

          $window.localStorage.setItem('BMSClient.lastLogin', $scope.login);

          app.server.user.login({login:$scope.login, password:$scope.password},function(data, status){
            if (status == 0) { // 0 - значит сервер не отвечает
                $scope.myModal = {
                   title: "Сервер не отвечает", //!!!!!!!!!!!!!
                   body: "Сервер не отвечает"
                };
                //$scope.UI.serverConnectionStatus = $filter("printf")(app.locale.server.notRespond, app.settings.server.host);
                $("#myModal").modal("show");
                return; //выходим из функции
            }

            if (status == 200) { // 200 - значит пользователь залогинен
                $window.localStorage.setItem('BMSClient.userIsLoggedIn', true);

                app.activeUser = data;
                var activeAppViewURL = './source/views/main/main.html';
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

        document.getElementById('loginEditBox').focus();

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
