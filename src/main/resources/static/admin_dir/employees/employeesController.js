angular.module('findFood').controller('employeesController', function ($rootScope, $scope, $http, $location, $localStorage) {


    const contextPath = 'http://localhost:5555/personal/api/v1';
    const contextPathAuth = 'http://localhost:5555/auth/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'employees';



    $scope.loadEmployees = function () {
            $http({
            url: contextPathAuth + '/persons/employees/all',
            method: 'GET',
            params: {
                by_role: $scope.by_role ? $scope.by_role : null,
                part_email: $scope.part_email ? $scope.part_email : null
            }
            })
            .then(function  successCallback(response) {
                $scope.EmployeesList = response.data;
                $scope.part_email = null;
            }, function errorCallback(response) {
                $rootScope.showAlertWindow(response);
            });
    };

    $scope.allRolesToString = function(roles) {
        var delimiter = '';
        var string = '';

        for(i=0; i < roles.length; i++) {
            if(i == roles.length-1) {
                delimiter = '';
            } else {
                delimiter = '; ';
            }
            string = string + roles[i].title + delimiter;
        }

        return string;
    };


    $scope.editEmployeeProfile = function(email){
        $localStorage.emailEditPersonProfile = email;
        $location.path('roles_edit');
    };

    $scope.deleteEmployeeRoles = function(roles){
        newRoles = new Array(1);
        for (i = 0; i < roles.length; i++){
            if(roles[i].title == 'CLIENT'){
                newRoles[0] = roles[i];
                break;
             }
        };
        return newRoles;
    };


    $scope.deleteEmployee = function(employee){
        let selectedEmployee = employee;
        selectedEmployee.roles = $scope.deleteEmployeeRoles(employee.roles);

        $http.put(contextPathAuth + '/persons/role', selectedEmployee)
            .then(function (response) {
                $scope.loadEmployees();
            }, function errorCallback(response) {
                $rootScope.showAlertWindow(response);
            });
    };


    //обработка пунктов меню

    $scope.showAddPersonForm = true;
    $rootScope.showAddPersonForm = function () {
        if($scope.showAddPersonForm){
            $scope.showAddPersonForm = false;
            return $scope.showAddPersonForm;
        } else {
            $scope.showAddPersonForm = true;
            return $scope.showAddPersonForm;
        }
    };


    $scope.loadEmployees();
});