angular.module('BMSClient.application.app',
    [
        'BMSClient.settings',
        'BMSClient.application.locales',
        'BMSClient.application.serverRemoteMethods',
        'BMSClient.application.serverRestURLs'
    ])
    .factory('app', ['appSettings', 'appLocales', 'serverRemoteMethods', 'serverRestURLs', function(appSettings, appLocales, serverRemoteMethods, serverRestURLs) {
        var app = {
            settings: appSettings,
            locale: appLocales[appSettings.localization],
            server: serverRemoteMethods
        };

        app.server.restURLs = serverRestURLs;

        return app;
    }]);
