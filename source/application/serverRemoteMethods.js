angular.module('BMSClient.application.serverRemoteMethods', ['BMSClient.settings'])
    .factory('serverRemoteMethods', ['appSettings', '$http', function(appSettings, $http) {

        $http.defaults.withCredentials = true; // без этой строки $httз не включает в заголовок Cookie и Sails отвечает на каждый запрос(!) Set-Cookie с новым значением

        function remoteCallDataServer(remoteCallURL, params, cb) {
            //onSuccess and onError callback format: function(data, status, headers, config)
            //$http({withCredentials:true});
            $http.post(appSettings.server.host + remoteCallURL, params).
                success(cb).
                error(cb);
        }

        function remoteCallStorageServer(remoteCallURL, params, cb) {
            //onSuccess and onError callback format: function(data, status, headers, config)
            //$http({withCredentials:true});
            $http.post(appSettings.storageServer.host + remoteCallURL, params).
                success(cb).
                error(cb);
        }

        var serverRemoteMethods = {
            user: {
                getActiveUser: function(cb) {
                    remoteCallDataServer('user/getActiveUser', {}, cb);
                },
                getUsersListToLogin: function(cb) {
                    remoteCallDataServer('user/getUsersListToLogin', {}, cb);
                },
                login: function(params, cb) {
                    remoteCallDataServer('user/login', params, cb);
                },
                logout: function(cb) {
                    remoteCallDataServer('user/logout', {}, cb);
                }
            }
        };

        return serverRemoteMethods;

    }]);

/*
 Вот что возврщается onError как в callback 'function(data, status, headers, config)' после $http.post(...)
 {
 "data": null, //"Forbidden"
 "status": 0,  //403 etc
 "headers": function headersGetter(),
 "config":
 {
 "method": "POST",
 "transformRequest": [ null ],
 "transformResponse": [ null ],
 "url": "http://localhost:1337/api/v1.0/user/getActiveUser",
 "data": {},
 "headers":
 {
 "Accept": "application/json, text/plain, * /*",
 "Content-Type": "application/json;charset=utf-8"
 }
 }
 }
 */
