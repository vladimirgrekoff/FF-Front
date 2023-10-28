angular.module('findFood').controller('menuController', function ($rootScope, $scope, $http, $location, $localStorage) {


    const contextPath = 'http://localhost:5555/menu/api/v1';
    const contextPathRestaurant = 'http://localhost:5555/rest/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'menu';

    $scope.email = $localStorage.findFoodUser.email;
    $scope.username = $localStorage.currentClient.username;
    $scope.categoriesDishList = $localStorage.categoriesDishList;
    $scope.menuByCategories = [];


    //категории блюд
    $scope.loadCategoriesDishes = function () {
        $http.get(contextPathRestaurant + '/categories/all')
            .then(function (response) {
                $localStorage.categoriesDishList = response.data;
                $scope.categoriesDishList = $localStorage.categoriesDishList;
            });
    };

    //Проверка загрузки категории блюд для подбора меню
    if($localStorage.categoriesDishList == undefined || $localStorage.categoriesDishList == null){
        $scope.loadCategoriesDishes();
    }

    $scope.getMenu = function(){
        $scope.clearRequestData();
        $http({
            url: contextPath + '/menus/all',
            method: 'GET',
            params: {
                telegramName:  $scope.telegramName ? $scope.telegramName : null,
                username: $scope.username,
                timesToEat: $scope.times_to_eat ? $scope.times_to_eat : null
            }
            }).then(function successCallback(response) {
                $scope.ok = true;
                $localStorage.currentClientMenu = response.data;
                $scope.clientMenu = $localStorage.currentClientMenu;
                $scope.dishDtoList = $scope.clientMenu.dishDtoList;
                $scope.getMenuByCategories();
            }, function errorCallback(response) {
                $scope.ok = false;
                $rootScope.showAlertWindow(response);
            });
    };


    $scope.isTitleCategoryExist = function(checkTitle){
        for(k=0; k<$scope.dishDtoList.length; k++){
            if($scope.dishDtoList[k].category == checkTitle){
                return true;
            }
        }
        return false;
    };

    $scope.getMenuByCategories = function(){
        for(i=0; i<$scope.categoriesDishList.length; i++){
            if ($scope.isTitleCategoryExist($scope.categoriesDishList[i].title)){
                dishesByCategory = {category: '', dishes: []};
                dishesByCategory.category = $scope.categoriesDishList[i].title;
                for(j=0; j<$scope.dishDtoList.length; j++){
                    if(dishesByCategory.category == $scope.dishDtoList[j].category){
                        dishesByCategory.dishes.push($scope.dishDtoList[j]);
                    }
                }
                $scope.menuByCategories.push(dishesByCategory);
            }
        }
        $localStorage.menuByCategories = $scope.menuByCategories;
    };


    $scope.clearRequestData = function(){
        $localStorage.currentClientMenu = {};
        $localStorage.menuByCategories = [];
        $scope.clientMenu = {};
        $scope.dishDtoList = {};
        $scope.menuByCategories = [];
    };



    $scope.checkMenuByCategories = function () {
        if($localStorage.menuByCategories != null &&
            $localStorage.menuByCategories != undefined &&
            $localStorage.menuByCategories.length != 0){
            $scope.menuByCategories = $localStorage.menuByCategories;
            $scope.clientMenu = $localStorage.currentClientMenu;
            $scope.ok = true;
        }else{
            $scope.ok = false;
        }
    };

    //переходы
    $scope.showDishPage = function (dish) {
        $rootScope.fromPage = 'menu';
        $localStorage.dishToEdit = dish;
        $http.get(contextPathRestaurant + '/restaurants/title/' + dish.restaurant)
            .then(function successCallback(response) {
                $localStorage.currentRestaurant = response.data;
                $location.path('dish');
            }, function errorCallback(response) {
                $rootScope.showAlertWindow(response);
            });
    };

    $scope.checkMenuByCategories();
});