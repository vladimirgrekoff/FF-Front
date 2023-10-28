angular.module('findFood').controller('clientController', function ($rootScope, $scope, $http, $location, $localStorage) {


    const contextPath = 'http://localhost:5555/personal/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'client';

    $scope.email = $localStorage.findFoodUser.email;

    $scope.getCurrentClient = function(){
        $http.get(contextPath + '/persons/email/' + $localStorage.findFoodUser.email)
            .then(function successCallback(response) {
                $localStorage.currentClient = response.data;
                $scope.currentClientName = $localStorage.currentClient.username;
                $scope.currentClient = $localStorage.currentClient;
            }, function errorCallback(response) {
            });
    };

    $scope.getCurrentClient();
});