angular.module('BMSClient.controllers.rootController', ['BMSClient.views.welcome.welcomeController', 'BMSClient.views.main.mainController'])
    .controller('rootController', ['app', 'appSettings', '$scope', '$window', '$timeout', '$filter', function(app, appSettings, $scope, $window, $timeout, $filter) {

        var userIsLoggedIn = $window.localStorage.getItem('BMSClient.userIsLoggedIn');

        //Инициализируем часть scope по UI-данным
        $scope.UI = {
            serverConnectionStatus: $filter("printf")(app.locale.server.connectionInit, appSettings.application.name), //Сразу пишем на экран, что начали устанавливать связь с сервером
            activeAppView: {}
        };

        //Если пользователь до этого нажал Logout, но на сервер команда не дошла,
        //то, чтобы нельзя было увидеть предыдущую сессию, сначала повторям Logout (без проверки сессии на сервере для уменьшения кода)
        if (userIsLoggedIn == null)
            app.server.user.logout(function(){});

          //Проверяем связь с сервером и заодно проверяем залогинены ли мы на сервере
        app.server.user.getActiveUser(function(data, status) {
            if (status == 0) { // 0 - значит сервер не отвечает
                $scope.UI.serverConnectionStatus = $filter("printf")(app.locale.server.notRespond, appSettings.application.name, app.settings.server.host);
                return; //выходим из функции, иначе ниже скрин будет переключен на view по-умолчанию, т.е. на welcome
            }

            var activeAppViewURL = './source/views/welcome/welcome.html'; //по-умолчанию отправляем пользователя на скрин логина

            if (status == 404) { // 404 - значит такой запрос НЕ известен серверу, а значит хоть он и ответил, то, скорее всего или не наш сервер, или не той версии
                //значит view не меняем, остаемся на окне загрузки, говорим что сервер не доступен по данному адресу
                $scope.UI.serverConnectionStatus = $filter("printf")(app.locale.server.notCorrectRespond, appSettings.application.name, app.settings.server.host);
                return; //выходим из функции, иначе ниже скрин будет переключен на view по-умолчанию, т.е. на welcome
            }

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

            //$timeout(function () {
                $scope.UI.activeAppView.show = true; // этот параметр отдельно от url и засунут в таймер только для того, чтобы animation по затемнению старого успела сработать, иначе новый appView уже появляется ниже appLoading
            //}, 500);
        });
    }]);
