angular.module('findFood').controller('selectRestaurantController', function ($rootScope, $scope, $http, $location, $localStorage) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1';
    const contextPath = 'http://localhost:5555/rest/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'nutritionist_select';

    var restaurant;

    restaurant = $localStorage.currentRestaurant;

    $scope.showCurrentRestaurantTitle = function(){
        return $localStorage.currentRestaurant.title;
    };


    $scope.loadAllRestaurants = function () {
        $http.get(contextPath + '/restaurants/all')
            .then(function (response) {
                $scope.RestaurantsList = response.data;
            });
    };



    //обработка пунктов меню


    //переходы
    $scope.showRestaurantRequestPage = function (restaurant) {
        $localStorage.currentRestaurant = restaurant;
        $location.path('restaurant_requests');
    };


    $scope.loadAllRestaurants();
});