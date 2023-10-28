angular.module('findFood').controller('clientInfoEditController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

    const contextPath = 'http://localhost:5555/personal/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'client_info_edit';


    $scope.currentClient = $localStorage.currentClient;

    $scope.currentClientName = $localStorage.currentClient.username;

    //переменные для проверки внесеия изменений
    $scope.firstname = $scope.currentClient.info_dto.firstname;
    $scope.surname = $scope.currentClient.info_dto.surname;
    $scope.lastname = $scope.currentClient.info_dto.lastname;
    $scope.index = $scope.currentClient.info_dto.index;
    $scope.city = $scope.currentClient.info_dto.city;
    $scope.street = $scope.currentClient.info_dto.street;
    $scope.house = $scope.currentClient.info_dto.house;
    $scope.apartment = $scope.currentClient.info_dto.apartment;
    $scope.phoneNumber = $scope.currentClient.info_dto.phoneNumber;
    $scope.telegramName = $scope.currentClient.info_dto.telegramName;
//    $scope.email = $scope.currentClient.info_dto.email;


    //данные для правки
    $scope.getCurrentClientForEdit = function(){
        $http.get(contextPath + '/persons/email/' + $localStorage.findFoodUser.email)
            .then(function successCallback(response) {
                $scope.editedClientInfo = response.data.info_dto;
            }, function errorCallback(response) {
            });
    };

    $scope.updateClientInfo = function(){
        if ($scope.isEmptyClientInfoData() == false){
            var editedClientInfo = $scope.editedClientInfo;
            if($scope.checkForChanges(editedClientInfo)){
                $http.put(contextPath + '/persons/info', editedClientInfo)
                    .then(function (response) {
                        $scope.editedClientInfo.firstname = null;
                        $scope.editedClientInfo.surname = null;
                        $scope.editedClientInfo.lastname = null;
                        $scope.editedClientInfo.index = null;
                        $scope.editedClientInfo.city = null;
                        $scope.editedClientInfo.street = null;
                        $scope.editedClientInfo.house = null;
                        $scope.editedClientInfo.apartment = null;
                        $scope.editedClientInfo.phoneNumber = null;
                        $scope.editedClientInfo.telegramName = null;
                        alert("Изменения в БД внесены");
                }, function errorCallback(response) {
                    $rootScope.showAlertWindow(response);
                });
            }
        }
    };

    $scope.checkForChanges = function(after){
        if($scope.firstname == after.firstname &&
        $scope.surname == after.surname &&
        $scope.lastname == after.lastname &&
        $scope.index == after.index &&
        $scope.city == after.city &&
        $scope.street == after.street &&
        $scope.house == after.house &&
        $scope.apartment == after.apartment &&
        $scope.phoneNumber == after.phoneNumber &&
        $scope.telegramName == after.telegramName){
                alert("При выполнении правки профиля пользователя не внесено " +
                    "\nни одного изменения! " +
                    "\nВыполнять обращение к базе данных не имеет смысла. " +
                    "\nВы можете вернуться на страницу просмотра анкеты " +
                    "\nили продолжить внесение изменений.");
                return false;
           }
        return true;
    };

    $scope.undoChanges = function(){
        if($scope.firstname != $scope.editedClientInfo.firstname){
            $scope.editedClientInfo.firstname = $scope.firstname;
        }
        if($scope.surname != $scope.editedClientInfo.surname){
            $scope.editedClientInfo.surname = $scope.surname;
        }
        if($scope.lastname != $scope.editedClientInfo.lastname){
            $scope.editedClientInfo.lastname = $scope.lastname;
        }
        if($scope.index != $scope.editedClientInfo.index){
            $scope.editedClientInfo.index = $scope.index;
        }
        if($scope.city != $scope.editedClientInfo.city){
            $scope.editedClientInfo.city = $scope.city;
        }
        if($scope.street != $scope.editedClientInfo.street){
            $scope.editedClientInfo.street = $scope.street;
        }
        if($scope.house != $scope.editedClientInfo.house){
            $scope.editedClientInfo.house = $scope.house;
        }
        if($scope.apartment != $scope.editedClientInfo.apartment){
            $scope.editedClientInfo.apartment = $scope.apartment;
        }
        if($scope.phoneNumber != $scope.editedClientInfo.phoneNumber){
            $scope.editedClientInfo.phoneNumber = $scope.phoneNumber;
        }
        if($scope.telegramName != $scope.editedClientInfo.telegramName){
            $scope.editedClientInfo.telegramName = $scope.telegramName;
        }
    };

    $scope.isEmptyClientInfoData = function(){
        if($scope.editedClientInfo.city == undefined || $scope.editedClientInfo.city == null || $scope.editedClientInfo.city == ''){
            alert("Поле 'Город' должно быть заполнено!");
            return true;
        }
        if($scope.editedClientInfo.phoneNumber == undefined || $scope.editedClientInfo.phoneNumber == null || $scope.editedClientInfo.phoneNumber == ''){
            alert("Поле 'Номер телефона' должно быть заполнено!");
            return true;
        }
        return false;
    };




    //переходы
    $rootScope.showProfilePage = function () {
        $location.path('client_info');
    };


    $scope.getCurrentClientForEdit();
});