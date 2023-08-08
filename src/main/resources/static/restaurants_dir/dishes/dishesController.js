angular.module('findFood').controller('dishesController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1/dishes';
    const contextPath = 'http://localhost:5555/rest/api/v1/dishes';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'dishes';


    if($rootScope.currentPage != 'restaurant'){
        $rootScope.activeContent = '';
    }

    var restaurant;

    restaurant = $localStorage.currentRestaurant;

    $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;


     $scope.loadAllDishesByRestaurantId = function () {
        var id;
        id = $localStorage.currentRestaurant.id;
         $http.get(contextPath + '/restaurant/' + id)
             .then(function (response) {
                 $scope.DishesList = response.data;
             });
     };

    $scope.deleteDish = function (dishId) {
        $http.delete(contextPath + '/' + dishId)
            .then(function (response) {
                $scope.loadAllDishesByRestaurantId();
            });
    };

    //обработка пунктов меню
    $scope.showDelButton = true;
    $rootScope.showDeleteDishButton = function () {
        if(!$scope.showEditButton){
            //Если показана кнопка правка списка блюд, скрыть
            $rootScope.showEditDishButton();
        }
        if($scope.showDelButton){
            $scope.showDelButton = false;
            return $scope.showDelButton;
        } else {
            $scope.showDelButton = true;
            return $scope.showDelButton;
        }
    };


    $scope.showEditButton = true;
    $rootScope.showEditDishButton = function () {
        if(!$scope.showDelButton){
            //Если показана кнопка удалить блюдо, скрыть
            $rootScope.showDeleteDishButton();
        }
        if($scope.showEditButton){
            $scope.showEditButton = false;
            return $scope.showEditButton;
        } else {
            $scope.showEditButton = true;
            return $scope.showEditButton;
        }
    };


    //переходы
    $scope.showDishPage = function (dish) {
        $localStorage.dishToEdit = dish;
        $location.path('dish');
    };

    $scope.showEditDishPage = function (dish) {
        $localStorage.dishToEdit = dish;
        $location.path('dish_edit');
    };

    $rootScope.showRestaurantPage = function () {
        $location.path('restaurant');
    };
    $scope.loadAllDishesByRestaurantId();
});