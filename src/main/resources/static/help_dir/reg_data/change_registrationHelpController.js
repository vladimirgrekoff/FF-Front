angular.module('findFood').controller('change_registrationHelpController', function ($rootScope, $scope, $http, $location) {
    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'change_registration';



    //переходы
    $scope.showContentPage = function () {
        $location.path('help');
    };
});