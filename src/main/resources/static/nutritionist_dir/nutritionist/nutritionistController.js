angular.module('findFood').controller('nutritionistController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {


        const contextPath = 'http://localhost:5555/personal/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'nutritionist';



//    для не авторизованного пользователя (общая информация)
    if(!$localStorage.findFoodUser) {
        let nutritionist = $localStorage.currentNutritionist;

        $scope.currentNutritionist = $localStorage.currentNutritionist;

        $scope.loadNutritionistInfo = function(){
            let email;
            email = $localStorage.currentNutritionist.info_dto.email;
            $http.get(contextPath + '/persons/email/' + email)
                .then(function (response) {
                    $scope.nutritionistInfo = response.data;
                });
        };
        $scope.loadNutritionistInfo();




    } else if($localStorage.findFoodUser && $rootScope.hasRole('NUTRITIONIST') && !$rootScope.hasRole('ADMIN')){
        $scope.email = $localStorage.findFoodUser.email;

        $scope.getCurrentNutritionist = function(){
            $http.get(contextPath + '/persons/email/' + $scope.email)
               .then(function successCallback(response) {
                    $localStorage.currentNutritionist = response.data;
                    $localStorage.currentClient = $localStorage.currentNutritionist;
                    $scope.currentNutritionistName = $localStorage.currentNutritionist.username;
                    $scope.currentNutritionist = $localStorage.currentNutritionist;
                }, function errorCallback(response) {
                });
        };

        $scope.getCurrentNutritionist();

    }


});