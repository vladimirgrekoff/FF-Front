angular.module('findFood').controller("sendRequestController", function($rootScope, $scope, $http, $location, $window, $localStorage) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1';
    const contextPath = 'http://localhost:5555/rest/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'request_send';


    if($rootScope.currentPage != 'restaurant'){
        $rootScope.activeContent = '';
    }

    var restaurant;

    restaurant = $localStorage.currentRestaurant;

    $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;



    $scope.loadMailBox = function () {
            $http.get(contextPath + '/mail_box/' + $localStorage.guestMailBoxId)
                .then(function (response) {
                $scope.mailBox = response.data;
        });
    };


    $scope.deleteDishFromMailBox = function (dishId) {
        $http.delete(contextPath + '/mail_box/' + $localStorage.guestMailBoxId + '/delete/' + dishId)
            .then(function (response) {
                $scope.loadMailBox();
            });
    };

    $scope.clearMailBox = function () {
        $http.delete(contextPath + '/mail_box/' + $localStorage.guestMailBoxId + '/clear')
            .then(function (response) {
                $scope.loadMailBox();
            });
    };


    $scope.createRequestToNutritionist = function () {
        $http.post(contextPath + '/requests', $localStorage.guestMailBoxId)
            .then(function (response) {
                $scope.loadMailBox();
            });
    };


    //переходы
    $scope.showCreateRequestPage = function () {
        $location.path('request_create');
    };


    $scope.loadMailBox();

});