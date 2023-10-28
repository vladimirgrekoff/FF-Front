angular.module('findFood').controller('dishController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {


    const contextPath = 'http://localhost:5555/rest/api/v1/dishes';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'dish';

    var restaurant;

    restaurant = $localStorage.currentRestaurant;

    $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;




     $scope.loadDishById = function () {
        var id;
        id = $localStorage.dishToEdit.id;
         $http.get(contextPath + '/' + id)
             .then(function (response) {
                 $scope.Dish = response.data;
                 $localStorage.dishToEdit = $scope.Dish;
            }, function errorCallback(response) {
                $rootScope.showAlertWindow(response);
            });
     };



    $rootScope.isFromPage = function(pageName){
        if($rootScope.fromPage == pageName){
            return true;
        }
        return false;
    };



    //переходы
    $rootScope.showDishesPage = function () {
        $location.path('dishes');
    };

    //обработка пунктов меню
    $rootScope.showMenuPage = function () {
        $localStorage.currentRestaurant = {};
        $localStorage.dishToEdit = {};
        $rootScope.fromPage = '';
        $location.path('menu');
    };


    $scope.loadDishById();
});