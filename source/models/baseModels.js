angular.module('baseModels', ['ngResource'])

.factory('Document', function($resource, appSettings){
   return $resource(appSettings.storageServer.host + 'DICOMEnvelope/:Id', {Id:'@Id'})
})

/*.factory('Patient', function($resource, appSettings){
   return $resource(appSettings.server.host + 'patient/:patientId', {patientId:'@patientId'});
})
*/

.factory('Request', function($resource, appSettings){
   return $resource(appSettings.server.host + 'request/:requestId', {requestId:'@requestId'})
})

/*
.factory('PatientRequests', function($resource, appSettings){
   return $resource(appSettings.server.host + 'patient/:patientId/requests/', {patientId:'@patientId'});
})
*/

.factory('RequestedService', function($resource, appSettings){
   return function(mode) {
      //!!!!!!!!!!!!! оставляю эту фактори как функцию просто для памяти, она не нужна - можно оставить только первый 'requestedservice/:reqServiceId/' и обработает все возможные вызовы
      if (mode != 'ofRequest')
        return $resource(appSettings.server.host + 'requestedservice/:reqServiceId/', {/*reqServiceId:'@reqServiceId'*/});
      else
        //return $resource(appSettings.server.host + 'requestedservice/:reqServiceId:parentRequest', {/*reqServiceId:'@reqServiceId', parentRequest:'@parentRequest'*/});
        return $resource(appSettings.server.host + 'requestedservice/', {/*reqServiceId:'@reqServiceId', parentRequest:'@parentRequest'*/});
   }
})

.factory('ServiceTemplate', function($resource, appSettings){
   return $resource(appSettings.server.host + 'service/:serviceId/', {});
});
