angular.module('findFood').controller("confirmationController", function($rootScope, $scope, $http, $location, $window, $localStorage) {

    const contextPath = 'http://localhost:5555/auth/api/v1';

    $scope.$on('routeChangeStart', function(event, next, current) {
        if (typeof(current) != 'undefined') {
            $templateCache.remove(next.templateUrl);
        }
    });

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'confirmation';

    $scope.confirmData = function() {
        $http.post(contextPath + '/persons/confirmation', $scope.client)
            .then(function successCallback(response) {
                if (response.data) {
                 if(response.data != null){
                    $scope.ok = response.data;
                 }
                    $scope.client.email = null;
                    $scope.client.password = null;
                }
            }, function errorCallback(response) {
                $scope.error = response.data;
            });
    };


    //переходы
    $scope.showPasswordUpdatePage = function () {
        $location.path('change_password');
    };

    $scope.showEmailUpdatePage = function () {
        $location.path('change_email');
    };

});