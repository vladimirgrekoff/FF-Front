angular.module('findFood').controller("restaurantRegController", function($rootScope, $scope, $http, $location, $window, $localStorage) {
//    const contextPath = 'http://localhost:8187/market-auth/api/v1';
    const contextPath = 'http://localhost:5555/auth/api/v1';

    $scope.$on('routeChangeStart', function(event, next, current) {
        if (typeof(current) != 'undefined') {
            $templateCache.remove(next.templateUrl);
        }
    });

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'restaurant_registration';


    $scope.loginUser = function() {
    console.log('name=' + $scope.user.restaurant_name + ', ' + 'email=' + $scope.user.email + ', ' + 'password=' + $scope.user.password + ', ' + 'confirmPassword=' + $scope.user.confirmPassword);//////////
        $http.post(contextPath + '/register/restaurant', $scope.user)
            .then(function successCallback(response) {
                if (response.data) {
                    $scope.user.username = null;
                    $scope.user.email = null;
                    $scope.user.password = null;
                    $scope.user.confirmPassword = null;
                    $location.path('/welcome');
                }
            }, function errorCallback(response) {
                $scope.error = response.data;
            });
    };



});