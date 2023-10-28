angular.module('findFood').controller('filling_questionnaireHelpController', function ($rootScope, $scope, $http, $location) {
    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'filling_questionnaire';



    //переходы
    $scope.showContentPage = function () {
        $location.path('help');
    };
});