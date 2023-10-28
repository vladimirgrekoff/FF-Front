angular.module('findFood').controller('restaurantInfoController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1/restaurants';
    const contextPath = 'http://localhost:5555/rest/api/v1/restaurants';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'restaurant_info';

    var restaurant;

    restaurant = $localStorage.currentRestaurant;

    $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;


    $scope.loadRestaurantInfo = function(restaurant){
        var id;
        id = $localStorage.currentRestaurant.id;
        $http.get(contextPath + '/info/restaurant/'+ id)
            .then(function (response) {
                $scope.restaurantInfo = response.data;
                $localStorage.restaurantInfoToEdit = $scope.restaurantInfo;
            });
    };




    //переходы
    $scope.showConfirmationInfoPage = function () {
        $location.path('confirmation');
    };




    $scope.loadRestaurantInfo();
});