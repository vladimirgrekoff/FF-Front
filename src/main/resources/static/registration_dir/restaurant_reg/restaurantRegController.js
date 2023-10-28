angular.module('findFood').controller("restaurantRegController", function($rootScope, $scope, $http, $location, $window, $localStorage) {

    const contextPath = 'http://localhost:5555/auth/api/v1';

    $scope.$on('routeChangeStart', function(event, next, current) {
        if (typeof(current) != 'undefined') {
            $templateCache.remove(next.templateUrl);
        }
    });

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'restaurant_registration';


    $scope.loginRestaurant = function() {
        $http.post(contextPath + '/register/restaurant', $scope.restaurant)
            .then(function successCallback(response) {
                if (response.data) {
                 if(response.data.message != null){
                    alert(response.data.message + "\nСейчас вы будете переведены на главную страницу" +
                                                  "\nи сможете ввести свои email и пароль для входа" +
                                                  "\nна страниицу своего ресторана." +
                                                  "\nНа ней Вы сможете заполнить информацию о ресторане" +
                                                  "\nв меню 'Профиль ресторана'");
                 }
                    $scope.restaurant.title = null;
                    $scope.restaurant.email = null;
                    $scope.restaurant.password = null;
                    $scope.restaurant.confirmPassword = null;
                    $location.path('/welcome');
                }
            }, function errorCallback(response) {
                $scope.error = response.data;
            });
    };
});