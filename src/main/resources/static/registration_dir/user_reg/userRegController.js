angular.module('findFood').controller("userRegController", function($rootScope, $scope, $http, $location, $window, $localStorage) {

    const contextPath = 'http://localhost:5555/auth/api/v1';

    $scope.$on('routeChangeStart', function(event, next, current) {
        if (typeof(current) != 'undefined') {
            $templateCache.remove(next.templateUrl);
        }
    });

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'user_registration';

    $scope.loginUser = function() {
        $http.post(contextPath + '/register/user', $scope.user)
            .then(function successCallback(response) {
                if (response.data) {
                 if(response.data.message != null){
                    alert(response.data.message + "\nСейчас вы будете переведены на главную страницу" +
                                                  "\nи сможете ввести свои email и пароль для входа" +
                                                  "\nна свою страниицу." +
                                                  "\nНа ней Вы сможете заполнить Анкету для использования" +
                                                  "\nсервиса");
                 }
                    $scope.user.email = null;
                    $scope.user.name = null;
                    $scope.user.password = null;
                    $scope.user.confirmPassword = null;
                    $location.path('/welcome');
                }
            }, function errorCallback(response) {
                $scope.error = response.data;
            });
    };


});