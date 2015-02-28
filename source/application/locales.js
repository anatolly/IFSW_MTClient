angular.module('BMSClient.application.locales', ['BMSClient.application.locales.ru'])
    .factory('appLocales', ['RU-locale', function(localeRU) {
       var locales = {
          'ru': null,
          'en': null
       };

       locales.ru = localeRU;

       return locales;
    }]);
