angular.module('findFood').controller('change_usernameHelpController', function ($rootScope, $scope, $http, $location) {
    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'change_username';



    //переходы
    $scope.showContentPage = function () {
        $location.path('help');
    };
});