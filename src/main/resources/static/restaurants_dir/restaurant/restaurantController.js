angular.module('findFood').controller('restaurantController', function ($rootScope, $scope, $http, $window, $location, $localStorage, $templateCache) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1/restaurants';
    const contextPath = 'http://localhost:5555/rest/api/v1';


    $scope.$on('routeChangeStart', function(event, next, current) {
        if (typeof(current) != 'undefined') {
            $templateCache.remove(next.templateUrl);
        }
    });

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'restaurant';


    if(!$localStorage.findFoodUser || $rootScope.hasRole('ADMIN') || ($rootScope.hasRole('CLIENT')  && !$rootScope.hasRole('NUTRITIONIST'))){ //для админа (с меню) и не авторизованного пользователя (общая информация)
        let restaurant = $localStorage.currentRestaurant;
        $scope.currentRestaurant = $localStorage.currentRestaurant;
        $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;

        $scope.loadRestaurantInfo = function(){
            var id;
            id = $localStorage.currentRestaurant.id;
            $http.get(contextPath + '/restaurants/info/restaurant/'+ id)
                .then(function (response) {
                    $scope.restaurantInfo = response.data;
                });
        };
        $scope.loadRestaurantInfo();

    } else if($localStorage.findFoodUser && !$rootScope.hasRole('CLIENT') && !$rootScope.hasRole('ADMIN')){  //для работы ресторанов
        $scope.email = $localStorage.findFoodUser.email;


        //группы блюд для форм
        $scope.loadGroupDishes = function () {
            $http.get(contextPath + '/groups_of_dishes/all')
                .then(function (response) {
                    $localStorage.groupDishList = response.data;
                    $scope.groupDishList = $localStorage.groupDishList;
                    return $scope.groupDishList;
                });
        };

        //категории блюд для форм
        $scope.loadCategoriesDishes = function () {
            $http.get(contextPath + '/categories/all')
                .then(function (response) {
                    $localStorage.categoriesDishList = response.data;
                    $scope.categoriesDishList = $localStorage.categoriesDishList;
                    return $scope.categoriesDishList;
                });
        };

        //Проверка загрузки группы блюд для форм
        if($localStorage.groupDishList == undefined || $localStorage.groupDishList == null){
            $scope.loadGroupDishes();
        }
        //Проверка загрузки категории блюд для форм
        if($localStorage.categoriesDishList == undefined || $localStorage.categoriesDishList == null){
            $scope.loadCategoriesDishes();
        }



        $scope.getCurrentRestaurant = function () {
            $http.get(contextPath + '/restaurants/email/' + $localStorage.findFoodUser.email)
                .then(function successCallback(response) {
                    $localStorage.currentRestaurant = response.data;
                    $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;
                    $scope.loadRestaurantInfo();
                }, function errorCallback(response) {
                });
            };


        $scope.loadRestaurantInfo = function(){
            var id;
            id = $localStorage.currentRestaurant.id;
            $http.get(contextPath + '/restaurants/info/restaurant/'+ id)
                .then(function (response) {
                    $scope.restaurantInfo = response.data;
                });
        };


        //Id ящика
        if (!$localStorage.restMailBoxId) {
            $http.get(contextPath + '/mail_box/generate_id')
                .then(function successCallback(response) {
                    $localStorage.restMailBoxId = response.data.value;
                });
        }

        if($localStorage.getCurrentRestaurant == undefined || $localStorage.getCurrentRestaurant == null){
            $scope.getCurrentRestaurant();
        }

    }


});