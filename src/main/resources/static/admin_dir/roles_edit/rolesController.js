angular.module('findFood').controller('rolesController', function ($rootScope, $scope, $http, $location, $localStorage) {


    const contextPath = 'http://localhost:5555/auth/api/v1/persons';
    const contextPathPerson = 'http://localhost:5555/personal/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'roles_edit';


    $scope.$on('routeChangeStart', function(event, next, current) {
        if (typeof(current) != 'undefined') {
            $templateCache.remove(next.templateUrl);
        }
    });

    if ($localStorage.findFoodUser) {
        $http.defaults.headers.common.Authorization;
    };



    $scope.newRoles = $rootScope.Roles;
    $scope.editPersonName;

    $scope.editPerson;
    $scope.editPersonCurrentRoles;
    $scope.deletedRoles;



    $scope.getEditPersonName = function(){
        let username;
        let email = $localStorage.emailEditPersonProfile;
        $http.get(contextPathPerson + '/persons/email/' + email)
            .then(function successCallback(response) {
                $scope.editPersonName = response.data.username;
            }, function errorCallback(response) {
            });
    };

    $scope.loadEditProfile = function () {
        $scope.getEditPersonName();
        let email = $localStorage.emailEditPersonProfile;
        $http.get(contextPath + '/' + email)
            .then(function (response) {
                $scope.editPerson = response.data;
                $scope.setPersonCurrentRoles();
            }, function errorCallback(response) {
                alert('Профиль не найден');
            });
    };

    $scope.setPersonCurrentRoles = function(){
        $scope.editPersonCurrentRoles = $scope.editPerson.roles;
        $scope.deletedRoles = new Array();
    };



    $scope.deleteRole = function(deletedId){
        for(j=0; j < $scope.editPersonCurrentRoles.length; j++){
            if($scope.editPersonCurrentRoles[j].id == deletedId){
                $scope.deletedRoles.push($scope.editPersonCurrentRoles[j]);
                $scope.editPersonCurrentRoles.splice(j,1);
            }
        }
        if($scope.deletedRoles.length > 1){
            $scope.sortArray($scope.deletedRoles);
        }
    };

    $scope.restoreRole = function(){
        let id;
        let tempArray = $scope.editPersonCurrentRoles;
        for (i=0; i < $scope.deletedRoles.length; i++) {
            if($scope.deletedRoles[i] != null || $scope.deletedRoles[i] != ''){
                if($scope.isCorrectRole($scope.deletedRoles[i], tempArray)) {
                    id = $scope.deletedRoles[i].id;
                    tempArray.push($scope.deletedRoles[i]);
                    $scope.deletedRoles.splice(i,1);
                }
            }
        }
        $scope.editPersonCurrentRoles = tempArray;
        $scope.sortArray($scope.editPersonCurrentRoles);
    };


    $scope.sortArray = function(sortedArray){
        let temp;
        for(i = 0; i < sortedArray.length; i++){
            for(j = i+1; j < sortedArray.length; j++){
                if(Number(sortedArray[i].id) > Number(sortedArray[j].id)){
                    temp = sortedArray[i];
                    sortedArray[i] = sortedArray[j];
                    sortedArray[j] = temp;
                    temp = null;
                }
            }
        }
    };


    $scope.addNewRole = function(){
        let role = $scope.getRoleById($scope.addedRoleId);
        if(role == $scope.selected || role == ''){
            alert("Роль должна иметь одно из значений в списке новых ролей!");
        }else if($scope.isCorrectRole(role, $scope.editPersonCurrentRoles)) {
            $scope.editPersonCurrentRoles.splice(role.id-1,0, role);
            $scope.addedRoleId = $scope.selected;
        } else {
            alert("В списке назначенных ролей пользователя повторы не допустимы!");
        }
    };

    $scope.isCorrectRole = function(checkedRole, editArray){
        for(k = 0; k < editArray.length; k++) {
            if(editArray[k].title == checkedRole.title){
                return false;
            }
        }
        return true;
    };

    $scope.getRoleById = function(id){
        for(i = 0; i < $scope.newRoles.length; i++) {
            if($scope.newRoles[i].id == id){
                return $scope.newRoles[i];
            }
        }
    };

    $scope.saveEditedProfile = function(){
        $scope.editPerson.roles = $scope.editPersonCurrentRoles;
        let editPerson = $scope.editPerson;
        $http.put(contextPath + '/role', editPerson)
            .then(function (response) {
                editPerson = null;
                $scope.loadEditProfile();
            }, function errorCallback(response) {
                $rootScope.showAlertWindow(response);
                $scope.restoreRole();
            });
    };

    $scope.showProfileDetails = true;

    $scope.showDetailsTable = function () {
        if($rootScope.hasRole('CLIENT')){
            $scope.showDetails = false;
            return $scope.showProfileDetails;

        } else {
            $scope.showProfileDetails = true;
            return $scope.showProfileDetails;
        }
    };


    $scope.showClientsPage = function () {
            $location.path('clients');
    };


    $scope.loadEditProfile();

});