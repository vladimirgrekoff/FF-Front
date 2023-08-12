angular.module('findFood').controller("userRegController", function($rootScope, $scope, $http, $location, $window, $localStorage) {
//    const contextPath = 'http://localhost:8187/market-auth/api/v1';
    const contextPath = 'http://localhost:5555/auth/api/v1';

    $scope.$on('routeChangeStart', function(event, next, current) {
        if (typeof(current) != 'undefined') {
            $templateCache.remove(next.templateUrl);
        }
    });

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'user_registration';

    $scope.loginUser = function() {
    console.log('name=' + $scope.user.username + ', ' + 'email=' + $scope.user.email + ', ' + 'firstname=' + $scope.user.firstname + ', ' + 'lastname=' + $scope.user.lastname + ', ' + 'password=' + $scope.user.password + ', ' + 'confirmPassword=' + $scope.user.confirmPassword);//////////
        $http.post(contextPath + '/registration', $scope.user)
            .then(function successCallback(response) {
                if (response.data) {
                    $scope.user.username = null;
                    $scope.user.email = null;
                    $scope.user.firstname = null;
                    $scope.user.lastname = null;
                    $scope.user.password = null;
                    $scope.user.confirmPassword = null;
                    $location.path('/welcome');
                }
            }, function errorCallback(response) {
                $scope.error = response.data;
            });
    };

});