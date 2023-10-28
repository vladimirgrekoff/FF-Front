angular.module('findFood').controller('clientQuestionController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

    const contextPath = 'http://localhost:5555/personal/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'client_questionnaire';


    $scope.currentClient = $localStorage.currentClient;

    $scope.currentClientName = $localStorage.currentClient.username;



    //список значений полов
    $scope.loadSexList = function () {
        $http.get(contextPath + '/persons/sexes/titles/all')
            .then(function (response) {
                $localStorage.sexList = response.data.list;
                return $scope.sexList;
            });
    };

    //список уровней активности
    $scope.loadActivityList = function () {
        $http.get(contextPath + '/activities/titles/all')
            .then(function (response) {
                $localStorage.activityList = response.data.list;
                return $scope.activityList;
            });
    };

    //список желаемых значений достижимого веса
    $scope.loadGoalList = function () {
        $http.get(contextPath + '/goals/titles/all')
            .then(function (response) {
                $localStorage.goalList = response.data.list;
                return $scope.goalList;
            });
        };

    //Проверка загрузки списка значений полов
    if($localStorage.sexList == undefined || $localStorage.sexList == null){
        $scope.loadSexList();
    }

    //Проверка загрузки списка уровней активности
    if($localStorage.activityList == undefined || $localStorage.activityList == null){
        $scope.loadActivityList();
    }
    //Проверка загрузки загрузки списка желаемых значений достижимого веса
    if($localStorage.goalList == undefined || $localStorage.goalList == null){
        $scope.loadGoalList();
    }

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