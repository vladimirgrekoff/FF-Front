angular.module('findFood').controller('welcomeController', function ($rootScope, $scope, $http) {
    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'welcome';

    if($rootScope.currentPage != 'restaurant'){
        $rootScope.activeContent = '';
    }
});