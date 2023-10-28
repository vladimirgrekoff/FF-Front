angular.module('findFood').controller('clientInfoController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

    const contextPath = 'http://localhost:5555/personal/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'client_info';


    $scope.currentClient = $localStorage.currentClient;

    $scope.currentClientName = $localStorage.currentClient.username;


    $scope.getCurrentClient = function(){
        $http.get(contextPath + '/persons/email/' + $localStorage.findFoodUser.email)
            .then(function successCallback(response) {
                $localStorage.currentClient = response.data;
                $scope.currentClientName = $localStorage.currentClient.username;
                $scope.currentClient = $localStorage.currentClient;
            }, function errorCallback(response) {
            });
    };


    //переходы
    $scope.showConfirmationInfoPage = function () {
        $location.path('confirmation');
    };





    $scope.getCurrentClient();
});