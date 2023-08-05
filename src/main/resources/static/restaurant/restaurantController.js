angular.module('findFood').controller('restaurantController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1/restaurants';
    const contextPath = 'http://localhost:5555/rest/api/v1/restaurants';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'restaurant';


    var restaurant;

    restaurant = $localStorage.currentRestaurant;

    $scope.showCurrentRestaurantTitle = function(){
        return $localStorage.currentRestaurant.title;
    };

    $localStorage.guestMailBoxId = $localStorage.currentRestaurant.title;///////////////////////////////////

//    if (!$localStorage.guestMailBoxId) {
//        $http.get('http://localhost:8189/ff-restaurants/api/v1/mail_box/generate_id')
//            .then(function (response) {
//            $localStorage.guestMailBoxId = response.data.value;
//            console.log('guestMailBoxId ' + localStorage.guestMailBoxId);///////////////////////////////////
//        });
//    }

    $scope.loadRestaurantInfo = function(restaurant){
        var id;
        id = $localStorage.currentRestaurant.id;
        $http.get(contextPath + '/info/restaurant/'+ id)
            .then(function (response) {
                $scope.restaurantInfo = response.data;
            });
    };

    $scope.loadRestaurantInfo();
});