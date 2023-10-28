angular.module('findFood').controller("changeEmailController", function($rootScope, $scope, $http, $location, $window, $localStorage) {

    const contextPath = 'http://localhost:5555/auth/api/v1';

    $scope.$on('routeChangeStart', function(event, next, current) {
        if (typeof(current) != 'undefined') {
            $templateCache.remove(next.templateUrl);
        }
    });

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'change_email';

    $scope.defineEndPoint = function(){
        let result;
        if($rootScope.hasRole('CLIENT')){
            result = '/persons/user/email';
        }else if($rootScope.hasRole('RESTAURANT')){
            result = '/persons/restaurant/email';
        }
        return result;
    };


    $scope.changeEmail = function() {
    let endPoint;
    endPoint = $scope.defineEndPoint();
        $http.put(contextPath + endPoint , $scope.client)
            .then(function successCallback(response) {
                if (response.data) {
                    alert(response.data + "\nСейчас вы будете переведены на главную страницу" +
                                          "\nи сможете ввести свои обновленные данные для входа" +
                                          "\nна свою страниицу.");

                    $scope.client.password = null;
                    $scope.client.email = null;
                    $scope.client.newEmail = null;
                    $rootScope.tryToLogout();
                }
            }, function errorCallback(response) {
                $scope.error = response.data;
            });
    };

});