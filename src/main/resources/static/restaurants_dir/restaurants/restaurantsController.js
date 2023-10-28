angular.module('findFood').controller('restaurantsController', function ($rootScope, $scope, $http, $location, $localStorage) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1';
    const contextPath = 'http://localhost:5555/rest/api/v1';
    const contextPathAuth = 'http://localhost:5555/auth/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'restaurants';

    if($rootScope.currentPage != 'restaurant'){
        $rootScope.activeContent = '';
    }



    $scope.loadAllRestaurants = function () {
        $http({
            url: contextPath + '/restaurants/all',
            method: 'GET',
            params: {
                part_title: $scope.part_title ? $scope.part_title : null
            }
        })
            .then(function (response) {
                $scope.RestaurantsList = response.data;
                $scope.part_title = null;
            });
            $scope.loadAllRestaurantsInfo();///////////////////////////////
    };

    $scope.loadAllRestaurantsInfo = function () {
        $http.get(contextPath + '/restaurants/info/all')
            .then(function (response) {
                $scope.restaurantInfoList = response.data;
            });
    };

    $scope.getRestaurantEmail = function(id){
        for(i = 0; i < $scope.restaurantInfoList.length; i++){
            if ($scope.restaurantInfoList[i].restaurantId == id){
                return $scope.restaurantInfoList[i].email;
            }
        }
    }

    $scope.addNewRestaurant = function () {
        if ($scope.isEmptyRestaurantData() == false){
        $scope.newRestaurant.confirmPassword = $scope.newRestaurant.password;
            $http.post(contextPathAuth + '/register/restaurant', $scope.newRestaurant)
                .then(function (response) {
                if (response.data) {
                 if(response.data.message != null){
                    alert(response.data.message);
                 }
                    $scope.newRestaurant.title = null;
                    $scope.newRestaurant.email = null;
                    $scope.newRestaurant.password = null;
                    $scope.newRestaurant.confirmPassword = null;
                    $scope.errorReset();
                    $scope.loadAllRestaurants();
                }
            }, function errorCallback(response) {
                $scope.error = response.data;
            });
        }
    };

    $scope.errorReset = function(){
        if($scope.error != null){
            $scope.error = null;
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
        if($scope.newRestaurant.email == undefined || $scope.newRestaurant.email == null || $scope.newRestaurant.email == ''){
            alert("Поле 'email' должно быть заполнено!");
            return true;
        }
        if($scope.newRestaurant.password == undefined || $scope.newRestaurant.password == null || $scope.newRestaurant.password == ''){
            alert("Поле 'Пароль' должно быть заполнено!");
            return true;
        }
        return false;
    };

    $scope.DelRestResponse = {
                id:null,
                email:''
                };

    $scope.deleteRestaurant = function (restaurantId) {
        let m;
        let emailAddress;
        emailAddress = $scope.getRestaurantEmail(restaurantId);
        $scope.DelRestResponse.id = restaurantId;
        $scope.DelRestResponse.email = emailAddress;
        $http({
            url: contextPathAuth + '/persons/restaurant',
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            data: $scope.DelRestResponse
            }).then(function (response) {
                $scope.loadAllRestaurants();
            }, function errorCallback(response) {
                if(response.data.status != null && response.data.status != '' && response.data.status != undefined ){
                    m = response.data.status + "\n";
                }
                if(response.data.statusCode != null && response.data.statusCode != '' && response.data.statusCode != undefined ){
                    m = response.data.statusCode + "\n";
                }
                if(response.data.error != null && response.data.error != '' && response.data.error != undefined ){
                    m = m + response.data.error + "\n";
                }
                if(response.data.message != null && response.data.message != '' &&  response.data.message != undefined ){
                    m = m + response.data.message;
                }
                alert(m);
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