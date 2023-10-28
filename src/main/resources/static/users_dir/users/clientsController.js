angular.module('findFood').controller('clientsController', function ($rootScope, $scope, $http, $location, $localStorage) {


    const contextPath = 'http://localhost:5555/personal/api/v1';
    const contextPathAuth = 'http://localhost:5555/auth/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'clients';

    $scope.loadPersons = function () {
        $http({
            url: contextPath + '/persons/all',
            method: 'GET',
            params: {
                part_username: $scope.part_username ? $scope.part_username : null,
                part_email: $scope.part_email ? $scope.part_email : null
            }
        })
        .then(function (response) {
            $scope.PersonsList = response.data;
            $scope.part_username = null;
            $scope.part_email = null;
        });
    };


    $scope.editPersonProfile = function(email, username){
        $localStorage.emailEditPersonProfile = email;
        $location.path('roles_edit');
    };

    $scope.addNewUser = function () {
        if ($scope.isEmptyNewUserData() == false){
        $scope.newUser.confirmPassword = $scope.newUser.password;
            $http.post(contextPathAuth + '/register/user', $scope.newUser)
                .then(function (response) {
                if (response.data) {
                 if(response.data.message != null){
                    alert(response.data.message);
                 }
                    $scope.newUser.name = null;
                    $scope.newUser.password = null;
                    $scope.newUser.email = null;
                    $scope.newUser.roles = null;
                    $scope.errorReset();
                    $scope.loadPersons();
                }
            }, function errorCallback(response) {
                $scope.error = response.data;
            });
        }
    };

    $scope.errorReset = function(){
        if($scope.error != null){
            $scope.error = null;
        }
    };

    $scope.isEmptyNewUserData = function(){
        if($scope.newUser == undefined || $scope.newUser == null){
            alert("При добавлении нового пользователя все поля должны быть заполнены!");
            return true;
        }
        if($scope.newUser.name == undefined || $scope.newUser.name == null || $scope.newUser.name == ''){
            alert("Поле 'Имя пользователя' должно быть заполнено!");
            return true;
        }
        if($scope.newUser.email == undefined || $scope.newUser.email == null || $scope.newUser.email == ''){
            alert("Поле 'email' должно быть заполнено!");
            return true;
        }
        if($scope.newUser.password == undefined || $scope.newUser.password == null || $scope.newUser.password == ''){
            alert("Поле 'Пароль' должно быть заполнено!");
            return true;
        }
        return false;
    };

    $scope.DelPersonResponse = {
                id:null,
                email:''
                };

    $scope.deletePerson = function (id, email) {
        let m;
        $scope.DelPersonResponse.id = id;
        $scope.DelPersonResponse.email = email;
        $http({
            url: contextPathAuth + '/persons/user',
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            data: $scope.DelPersonResponse
            }).then(function (response) {
                $scope.loadPersons();
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


    $scope.loadPersons();
});