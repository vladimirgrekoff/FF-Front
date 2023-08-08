angular.module('findFood').controller('newDishController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1/dishes';
    const contextPath = 'http://localhost:5555/rest/api/v1/dishes';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'dish_new';

    var restaurant;

    restaurant = $localStorage.currentRestaurant;

    $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;

    $scope.newDish = {
        title:'',
        restaurant_title:'',
        description:'',
        price:null,
        calories:null,
        proteins:null,
        fats:null,
        carbohydrates:null,
        healthy:null,
        approved:null,
        category_title:''
    };

    $scope.newDish.restaurant_title = restaurant.title;
    $scope.groupList = $localStorage.groupDishList;
    $scope.categoriesList = $localStorage.categoriesDishList;

    $scope.addNewDish = function () {
        if ($scope.isEmptyNewDishData() == false){
            $scope.newDish.group_dish_title = $scope.groupDishTitle;
            $scope.newDish.category_title = $scope.categoryTitle;
            $http.post(contextPath, $scope.newDish)
                .then(function (response) {
                    $scope.newDish.title = null;
                    $scope.newDish.restaurant_title = null;
                    $scope.newDish.description = null;
                    $scope.newDish.price = null;
                    $scope.newDish.calories = null;
                    $scope.newDish.proteins = null;
                    $scope.newDish.fats = null;
                    $scope.newDish.carbohydrates = null;
                    $scope.newDish.healthy = null;
                    $scope.newDish.approved = null;
                    $scope.groupDishTitle = $scope.selected;
                    $scope.categoryTitle = $scope.selected;
                    alert("Новое блюдо добавлено");
                });
        }
    };


    $scope.isEmptyNewDishData = function(){
        if($scope.newDish == undefined || $scope.newDish == null){
            alert("При добавлении нового блюда все поля должны быть заполнены!");
            return true;
        }
        if($scope.newDish.title == undefined || $scope.newDish.title == null || $scope.newDish.title == ''){
            alert("Поле 'Название' должно быть заполнено!");
            return true;
        }
        if($scope.newDish.description == undefined || $scope.newDish.description == null || $scope.newDish.description == ''){
            alert("Поле 'Описание' должно быть заполнено!");
            return true;
        }
        if($scope.groupDishTitle == undefined || $scope.groupDishTitle == ''){
            alert("'Группа блюд' должна иметь одно из значений в списке 'Выбор группы'!");
            return true;
        }
        if($scope.newDish.calories == undefined || $scope.newDish.calories == null || $scope.newDish.calories == ''){
            if(angular.isNumber($scope.newDish.calories) == false){
                alert("Поле 'Калории' должно быть заполнено!");
                return true;
            }
        }
        if($scope.newDish.proteins == undefined || $scope.newDish.proteins == null || $scope.newDish.proteins == ''){
            if(angular.isNumber($scope.newDish.proteins) == false){
                alert("Поле 'Белки' должно быть заполнено!");
                return true;
            }
        }
        if($scope.newDish.fats == undefined || $scope.newDish.fats == null || $scope.newDish.fats == ''){
            if(angular.isNumber($scope.newDish.fats) == false){
                alert("Поле 'Жиры' должно быть заполнено!");
                return true;
            }
        }
        if($scope.newDish.carbohydrates == undefined || $scope.newDish.carbohydrates == null || $scope.newDish.carbohydrates == ''){
            if(angular.isNumber($scope.newDish.carbohydrates) == false){
                alert("Поле 'Углеводы' должно быть заполнено!");
                return true;
            }
        }
        if($scope.newDish.price == undefined || $scope.newDish.price == null || $scope.newDish.price == 0 || $scope.newDish.price == ''){
            alert("Поле 'Стоимость' должно быть заполнено!");
            return true;
        }
        if($scope.categoryTitle == undefined || $scope.categoryTitle == ''){
            alert("'Категория блюд' должна иметь одно из значений в списке 'Выбор категории'!");
            return true;
        }
        return false;
    };


    //переходы
    $rootScope.showDishesPage = function () {
        $location.path('dishes');
    };

});