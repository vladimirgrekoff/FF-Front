angular.module('findFood').controller('nutritionistsController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {


        const contextPath = 'http://localhost:5555/personal/api/v1';
        const contextPathAuth = 'http://localhost:5555/auth/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'nutritionists';



    $scope.loadEmployees = function () {
            $http({
            url: contextPathAuth + '/persons/employees/all',
            method: 'GET',
            params: {
                by_role: 'NUTRITIONIST',
                part_email: null
            }
            })
            .then(function successCallback(response) {
                $scope.EmployeesList = response.data;
                $scope.part_email = null;
                $scope.getEmailListFromEmployeesList();
            }, function errorCallback(response) {
                $rootScope.showAlertWindow(response);
            });
    };



    $scope.getEmailListFromEmployeesList = function(){
        $scope.emailList = new Array($scope.EmployeesList.length);
        for(i=0; i < $scope.EmployeesList.length; i++){
            $scope.emailList[i] = $scope.EmployeesList[i].email;
        }
        $scope.getEmployeesInfoList();
    };


    $scope.getEmployeesInfoList = function(){
        $http({
            url: contextPath + '/persons/employees',
            method: 'GET',
            params: {
                list_email: $scope.emailList,
                part_email: $scope.part_email ? $scope.part_email : null,
                part_lastname: $scope.part_lastname ? $scope.part_lastname : null
            }
            })
            .then(function successCallback(response) {
                $scope.EmployeesInfoList = response.data;
                $scope.part_email = null;
                $scope.part_lastname = null;
            }, function errorCallback(response) {
            });
    };

    //переходы
    $scope.showNutritionistPage = function (nutritionist) {
        $localStorage.currentNutritionist = nutritionist;
        $location.path('nutritionist');
    };


    $scope.loadEmployees();



});