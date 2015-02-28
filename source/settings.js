angular.module('BMSClient.settings', [])
    .constant('appSettings',
    {
       application: {
          name: 'INTRAFAB Semantic Warehouse',
          version: '0.1 A' //Major.Minor[.Build Number].Build Type
       },

       localization: 'ru',

       server: {
          host: 'http://localhost:8080/v1.0/'
          //apiVer: 'v1.0/'
          //ajaxRequestTimeout: 5000 //5 sec
       },

       storageServer: {
          //host: 'http://localhost:1337/v1.0/'
              host: 'http://localhost:8080/v1.0/'
          //apiVer: 'v1.0/'
          //ajaxRequestTimeout: 5000 //5 sec
       }
    });
