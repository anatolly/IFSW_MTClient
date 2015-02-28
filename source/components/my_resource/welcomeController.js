angular.module('myApp.welcomeController', ['ngResource', 'altTable'])

    .constant('appSettings',
    {
       server: {
          host: 'http://localhost:1337/v1.0/',
          //apiVer: 'v1.0/'
          //ajaxRequestTimeout: 5000 //5 sec
       }
    })

.factory('Patient', function($resource, appSettings){
   return $resource(appSettings.server.host + 'patient/:patientId', {patientId:'@patientId'});
})

.factory('Request', function($resource, appSettings){
   return $resource(appSettings.server.host + 'request/:requestId', {requestId:'@requestId'})
})

.factory('PatientRequests', function($resource, appSettings){
   return $resource(appSettings.server.host + 'patient/:patientId/requests/', {patientId:'@patientId'});
})

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
/*
.factory('RequestedServices', function($resource, appSettings){
   return $resource(appSettings.server.host + 'requestedservice/:reqServiceId?parentRequest', {reqServiceId:'@reqServiceId'});
})
*/
.controller('welcomeController', function($scope, $timeout, Patient, PatientRequests, RequestedService) {

        /////////////////////////////////////////////////

        //var PatientRequest = $resource('http://www.localhost:1337/v1.0/patient/:patientId/requests/:requestId', {requestId:'@id'});

        //var request = Request.get({requestId:2}, function() {
        //   console.log(request);
        //});

        //var requests = Request.query({patientSex:'male'}, function() {
        //var requests = Request.query({patientName:'Tolik2'}, function() {
        //var requests = Request.query({}, function() {
        //var requests = Request.query({requestId:2}, function() {
        //   console.log(requests);
        //});

        $scope.myData = [{name:"default"}];

        var result = RequestedService().query({parentRequest:2}, function(data) {
           console.log(data);
        });

        var result = RequestedService('ofRequest').query({parentRequest:2}, function(data) {
        //var result = RequestedService('ofRequest').query({}, function(data) {
           console.log(data);
        });

        Patient.query({}, function(data) {
           $timeout(function(){
              $scope.myData = data;
           }, 2000);    
           //console.log($scope.myData);
        });

        /////////////////////////////////////////////////

        document.getElementById('passwordInputId').focus();

});
