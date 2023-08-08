angular.module('findFood').controller("createRequestController", function($rootScope, $scope, $http, $location, $window, $localStorage) {

//    const contextPath = 'http://localhost:8189/ff-restaurants/api/v1';
    const contextPath = 'http://localhost:5555/rest/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'request_create';


    if($rootScope.currentPage != 'restaurant'){
        $rootScope.activeContent = '';
    }



    var restaurant;

    restaurant = $localStorage.currentRestaurant;

    $scope.currentRestaurantTitle = $localStorage.currentRestaurant.title;

     $scope.loadAllDishesByRestaurantId = function () {
        var id;
        id = $localStorage.currentRestaurant.id;
         $http.get(contextPath + '/dishes/restaurant/' + id)
             .then(function (response) {
                 $scope.DishesList = response.data;
             });
     };





    $scope.loadMailBox = function () {
        let restMailBoxId = $localStorage.restMailBoxId;
                console.log('$localStorage.restMailBoxId ' + restMailBoxId);///////////////////////
            $http.get(contextPath + '/mail_box/' + restMailBoxId)
                .then(function (response) {
                $scope.mailBox = response.data;
        });
    };


    $scope.addDishToMailBox = function (dishId) {
        if($scope.isDishInList(dishId)){
            alert('Блюдо уже есть в списке!!!\nПопробуйте выбрать другое.');
            return;
        }
        $http.get(contextPath + '/mail_box/' + $localStorage.restMailBoxId + '/add/' +dishId)
            .then(function (response) {
                dishId = null;
                $scope.loadMailBox();
            });
    };

    $scope.isDishInList = function (varId) {
        if($scope.mailBox.items.length > 0){
            for (i=0; i<$scope.mailBox.items.length; i++){
                if ($scope.mailBox.items[i].dishId == varId){
                    return true;
                }
            }
            return false;
        }
    }


//    $scope.tryToLogout = function () {
//        $scope.clearUser();
//        $localStorage.$reset();
//        $location.path('welcome');
//    };

//    $scope.tryLogout = function() {
//        if($rootScope.logout){
//            $location.path('welcome');
//            $rootScope.logout();
//        } else{
//            $location.path('welcome');
//        }
//    };


    $scope.loadAllDishesByRestaurantId();
    $scope.loadMailBox();

});