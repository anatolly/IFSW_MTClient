angular.module('BMSClient.views.main.uploadDocumentController', ['myTabsModule', 'altTable', 'baseModels'])

.directive('altFileModel', function (){
  return {
    controller: function($parse, $element, $attrs, $scope){

      $element.on('change', function(){
        var file = this.files[0];
        console.log(file);
        $scope.$apply(function(){
          $scope[$attrs.altFileModel] = file;
        });
      });

    }
  };
})

.factory('formDataObject', function() {
  return function(data) {
    var fd = new FormData();
    angular.forEach(data, function(value, key) {
      fd.append(key, value); //key - это имя поля в объекте "data:{dicom_file: $scope.myFile}" как параметре $http
    });
    console.log(fd);
    return fd;
  };
})

    .controller('uploadDocumentController', function(app, $scope, $http, $window, Request, RequestedService, ServiceTemplate, formDataObject) {

        $scope.tolik = 'dfads';

        $scope.upload = function() {

          function func(data, status) {
             alert("Сервер вернул статус:" + status);
             alert(data);
          };

          //отлично работает для отсылки сразу данных в теле запроса, туда можно и тело файла залить (без названия и др полей).
          //для формата отправляемых данных типа form (с разделением по полям формы с их названиями и значениями надо использовать FormData)
          //$http.post('http://localhost:1337/v1.0/DICOMEnvelope/upload', $scope.myFile, { headers: { 'Content-Type' : $scope.myFile.type } }).
          //      success(func).
          //      error(func);

          /*$http({
            method: 'POST',
            url: 'http://localhost:1337/v1.0/DICOMEnvelope/upload',
            //headers: {
            //  'Content-Type': 'multipart/form-data'
            //},
            data: {
              dicom_file: $scope.myFile
            },
              transformRequest: formDataObject
          })
            .success(func)
            .error(func);
         */
         var xmlHttp=new XMLHttpRequest();
         xmlHttp.open("POST", "http://localhost:1337/v1.0/DICOMEnvelope/upload", true);
         //xmlHttp.setRequestHeader("Content-type","multipart/form-data");
         var formData = new FormData();  
         formData.append("dicom_file", $scope.myFile);
         xmlHttp.send(formData);
        oReq.addEventListener("error", transferComplete);
        oReq.addEventListener("load", transferComplete);
        oReq.addEventListener("abort", transferComplete);

    function transferComplete(evt) {
        handleResults(evt.target);
    }
        };

    });
