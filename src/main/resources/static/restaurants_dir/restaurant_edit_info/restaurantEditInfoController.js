angular.module('findFood').controller('restaurantEditInfoController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1/restaurants';
    const contextPath = 'http://localhost:5555/rest/api/v1/restaurants';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'restaurant_edit_info';

    var restaurant;

    restaurant = $localStorage.currentRestaurant;


    $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;

    $scope.beforeEditRestaurantInfo = $localStorage.restaurantInfoToEdit;
    $scope.editedRestaurantInfo = $localStorage.restaurantInfoToEdit;

    //переменные для проверки внесеия изменений
    $scope.description = $scope.beforeEditRestaurantInfo.description;
    $scope.cuisines = $scope.beforeEditRestaurantInfo.cuisines;
    $scope.address = $scope.beforeEditRestaurantInfo.address;
    $scope.phoneNumber = $scope.beforeEditRestaurantInfo.phoneNumber;
    $scope.email = $scope.beforeEditRestaurantInfo.email;
    $scope.openHours = $scope.beforeEditRestaurantInfo.openHours;

    $scope.updateRestaurantInfo = function(){
        if ($scope.isEmptyRestaurantInfoData() == false){
            var editedRestaurantInfo = $scope.editedRestaurantInfo;
            if($scope.checkForChanges(editedRestaurantInfo)){
                $http.put(contextPath + '/info', editedRestaurantInfo)
                    .then(function (response) {
                        $scope.editedRestaurantInfo.description = null;
                        $scope.editedRestaurantInfo.cuisines = null;
                        $scope.editedRestaurantInfo.address = null;
                        $scope.editedRestaurantInfo.phoneNumber = null;
                        $scope.editedRestaurantInfo.email = null;
                        $scope.editedRestaurantInfo.openHours = null;
                        alert("Изменения в БД внесены");
                });
            }
        }
    };


    $scope.checkForChanges = function(after){
        if($scope.description == after.description &&
        $scope.cuisines == after.cuisines &&
        $scope.address == after.address &&
        $scope.phoneNumber == after.phoneNumber &&
        $scope.email == after.email &&
        $scope.openHours == after.openHours){
                alert("При выполнении правки профиля ресторана не внесено " +
                    "\nни одного изменения! " +
                    "\nВыполнять обращение к базе данных не имеет смысла. " +
                    "\nВы можете вернуться на страницу профиля ресторана " +
                    "\nили продолжить внесение изменений.");
                return false;
           }
        return true;
    };


    $scope.undoChanges = function(){
        if($scope.description != $scope.editedRestaurantInfo.description){
            $scope.editedRestaurantInfo.description = $scope.description;
        }
        if($scope.cuisines != $scope.editedRestaurantInfo.cuisines){
            $scope.editedRestaurantInfo.cuisines = $scope.cuisines;
        }
        if($scope.address != $scope.editedRestaurantInfo.address){
            $scope.editedRestaurantInfo.address = $scope.address;
        }
        if($scope.phoneNumber != $scope.editedRestaurantInfo.phoneNumber){
            $scope.editedRestaurantInfo.phoneNumber = $scope.phoneNumber;
        }
        if($scope.email != $scope.editedRestaurantInfo.email){
            $scope.editedRestaurantInfo.email = $scope.email;
        }
        if($scope.openHours != $scope.editedRestaurantInfo.openHours){
            $scope.editedRestaurantInfo.openHours = $scope.openHours;
        }
    };

    $scope.isEmptyRestaurantInfoData = function(){
        if($scope.editedRestaurantInfo == undefined || $scope.editedRestaurantInfo == null){
            alert("При правке информации о ресторане все поля должны быть заполнены!");
            return true;
        }
        if($scope.editedRestaurantInfo.description == undefined || $scope.editedRestaurantInfo.description == null || $scope.editedRestaurantInfo.description == ''){
            alert("Поле 'Описание' должно быть заполнено!");
            return true;
        }
        if($scope.editedRestaurantInfo.cuisines == undefined || $scope.editedRestaurantInfo.cuisines == null || $scope.editedRestaurantInfo.cuisines == ''){
            alert("Поле 'Кухни' должно быть заполнено!");
            return true;
        }
        if($scope.editedRestaurantInfo.address == undefined || $scope.editedRestaurantInfo.address == null || $scope.editedRestaurantInfo.address == ''){
            alert("Поле 'Адрес' должно быть заполнено!");
            return true;
        }
        if($scope.editedRestaurantInfo.phoneNumber == undefined || $scope.editedRestaurantInfo.phoneNumber == null || $scope.editedRestaurantInfo.phoneNumber == ''){
            alert("Поле 'Номер телефона' должно быть заполнено!");
            return true;
        }
        if($scope.editedRestaurantInfo.email == undefined || $scope.editedRestaurantInfo.email == null || $scope.editedRestaurantInfo.email == ''){
            alert("Поле 'E-mail' должно быть заполнено!");
            return true;
        }
        if($scope.editedRestaurantInfo.openHours == undefined || $scope.editedRestaurantInfo.openHours == null || $scope.editedRestaurantInfo.openHours == ''){
            alert("Поле 'Часы работы' должно быть заполнено!");
            return true;
        }
        return false;
    };

    //переходы
    $scope.showRestaurantInfoPage = function () {
        $location.path('restaurant_info');
    };

});