angular.module('BMSClient.welcomeController', ['myTable'])
    .controller('welcomeController', ['$scope','$window', '$document', function($scope, $window, $document) {
        //region Создание myData
        var
            nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
            familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

        var objId = 1;
        function createRandomItem() {
            var
                firstName = nameList[Math.floor(Math.random() * 4)],
                lastName = familyName[Math.floor(Math.random() * 4)],
                age = Math.floor(Math.random() * 100),
                email = firstName + lastName + '@whatever.com',
                balance = Math.random() * 3000;

            return{
                id: objId++,
                firstName: firstName,
                lastName: lastName,
                age: age,
                email: email,
                balance: balance
            };
        }

        $scope.myData = [];
        for (var j = 0; j < 5; j++) {
            $scope.myData.push(createRandomItem());
        }
        //endregion

        document.getElementById('passwordInputId').focus();

    }]);
