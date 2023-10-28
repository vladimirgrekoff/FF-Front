angular.module('findFood').controller("changePasswordController", function($rootScope, $scope, $http, $location, $window, $localStorage) {

    const contextPath = 'http://localhost:5555/auth/api/v1';

    $scope.$on('routeChangeStart', function(event, next, current) {
        if (typeof(current) != 'undefined') {
            $templateCache.remove(next.templateUrl);
        }
    });

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'change_password';

    $scope.changePassword = function() {
        $scope.client.email = $localStorage.findFoodUser.email;
        $http.put(contextPath + '/persons/password', $scope.client)
            .then(function successCallback(response) {
                if (response.data) {
                    alert(response.data + "\nСейчас вы будете переведены на главную страницу" +
                                          "\nи сможете ввести свои обновленные данные для входа" +
                                          "\nна свою страниицу.");

                    $scope.client.email = null;
                    $scope.client.password = null;
                    $scope.client.newPassword = null;
                    $scope.client.confirmPassword = null;
                    $rootScope.tryToLogout();
                }
            }, function errorCallback(response) {
                $scope.error = response.data;
            });
    };

});