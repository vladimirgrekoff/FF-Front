angular.module('findFood').controller('restaurantRequestsController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1';
    const contextPath = 'http://localhost:5555/rest/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'restaurant_requests';


    var restaurant;

    restaurant = $localStorage.currentRestaurant;

    $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;


    $scope.requestId;
    $scope.tempId;





    $scope.loadRestaurantRequest = function(){

        $http.get(contextPath + '/requests/'+ $localStorage.currentRestaurant.title)
            .then(function (response) {
                $scope.restaurantRequests = response.data;
            });
    };

    //управление элементами страницы
    $scope.showDetailsItems = function(request){
        $scope.requestItems = request.items;
        $scope.tempId = $scope.requestId;
        $scope.requestId = request.id;
    };

    $scope.showDetails = true;
    $scope.showDetailsTable = function () {
        if($scope.requestId != undefined && $scope.showDetails == false) {
            if($scope.tempId == $scope.requestId){
                return $scope.showDetails = true;
            } else {
                $scope.showDetails = true;
            }
        }
        if($scope.showDetails){
            $scope.showDetails = false;
            return $scope.showDetails;

        } else {
            $scope.showDetails = true;
            return $scope.showDetails;
        }
    };

    //переходы
    $scope.showDishVerificationPage = function (requestId, item) {
        $localStorage.requestId = requestId;
        $localStorage.dishId = item.dishId;
        $localStorage.item = item;
        $location.path('restaurant_verification');
    };

    $scope.loadRestaurantRequest();
});