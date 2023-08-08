angular.module('findFood').controller('restaurantsController', function ($rootScope, $scope, $http, $location, $localStorage) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1';
    const contextPath = 'http://localhost:5555/rest/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'restaurants';

    if($rootScope.currentPage != 'restaurant'){
        $rootScope.activeContent = '';
    }



    $scope.loadAllRestaurants = function () {
        $http.get(contextPath + '/restaurants/all')
            .then(function (response) {
                $scope.RestaurantsList = response.data;
            });
    };

    $scope.addNewRestaurant = function () {
        if ($scope.isEmptyRestaurantData() == false){
            $http.post(contextPath + '/restaurants', $scope.newRestaurant)
                .then(function (response) {
                    $scope.newRestaurant.title = null;
                    $scope.loadAllRestaurants();
                });
        }
    };



    $scope.isEmptyRestaurantData = function(){
        if($scope.newRestaurant == undefined || $scope.newRestaurant == null){
            alert("При добавлении нового ресторана поле 'Название ресторана' должно быть заполнено!");
            return true;
        }
        if($scope.newRestaurant.title == undefined || $scope.newRestaurant.title == null || $scope.newRestaurant.title == ''){
            alert("Поле 'Название ресторана' должно быть заполнено!");
            return true;
        }
        return false;
    };

    $scope.deleteRestaurant = function (restaurantId) {
        $http.delete(contextPath + '/restaurants/' + restaurantId)
            .then(function (response) {
                $scope.loadAllRestaurants();
            });
    };

    //обработка пунктов меню
    $scope.showDelButton = true;
    $rootScope.showDeleteRestaurantButton = function () {
        if($scope.showDelButton){
            $scope.showDelButton = false;
            return $scope.showDelButton;
        } else {
            $scope.showDelButton = true;
            return $scope.showDelButton;
        }
    };

    $scope.showAddRestaurantForm = true;
    $rootScope.showAddRestaurantForm = function () {
        if($scope.showAddRestaurantForm){
            $scope.showAddRestaurantForm = false;
            return $scope.showAddRestaurantForm;
        } else {
            $scope.showAddRestaurantForm = true;
            return $scope.showAddRestaurantForm;
        }
    };

    //переходы
    $scope.showRestaurantPage = function (restaurant) {
        $localStorage.currentRestaurant = restaurant;
        $location.path('restaurant');
    };
    $scope.loadAllRestaurants();
});