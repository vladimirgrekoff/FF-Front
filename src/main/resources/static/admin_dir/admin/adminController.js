angular.module('findFood').controller('adminController', function ($rootScope, $scope, $http, $location, $localStorage) {


    const contextPath = 'http://localhost:5555/personal/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'admin';



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


    $scope.getRoles = function(){
        var roles = [];
        for(i = 0; i < $localStorage.findFoodUser.roles.length; i++){
            role = {id:null, title:''};
            role.id = i + 1;
            role.title = $localStorage.findFoodUser.roles[i];
            roles[i] = role;
        }
        return roles;
    };



    //переходы
    $rootScope.showProfilePage = function () {
        $location.path('client_info');
    };

    $scope.showRestaurantsPage = function () {
        $location.path('restaurants');
    };

    $scope.showClientsPage = function () {
            $location.path('clients');
    };

    $scope.showMenuPage = function () {
            $location.path('menu');
    };

    $scope.showQuestionnairePage = function () {
            $location.path('client_questionnaire');
    };

    $scope.showEmployeesPage = function () {
            $location.path('employees');
    };

    $rootScope.Roles = $scope.getRoles();

    $scope.getCurrentClient();

});