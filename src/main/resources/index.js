(function () {
    angular
        .module('findFood', ['ngRoute', 'ngStorage'])
        .config(config)
        .run(run);


    function config($routeProvider, $httpProvider) {

        $routeProvider.when('/welcome', {
            templateUrl:'welcome/welcomeTemplate.html',
            controller:'welcomeController',
            controllerAs:'welcome'

        })
        .when('/restaurants', {
            templateUrl:'restaurants/restaurantsTemplate.html',
            controller:'restaurantsController',
            controllerAs:'restaurants'
        })
        .when('/restaurant', {
            templateUrl:'restaurant/restaurantTemplate.html',
            controller:'restaurantController',
            controllerAs:'restaurant'
        })
        .when('/restaurant_info', {
            templateUrl:'restaurant_info/restaurantInfoTemplate.html',
            controller:'restaurantInfoController',
            controllerAs:'restaurant_info'
        })
        .when('/restaurant_edit_info', {
            templateUrl:'restaurant_edit_info/restaurantEditInfoTemplate.html',
            controller:'restaurantEditInfoController',
            controllerAs:'restaurant_edit_info'
        })
        .when('/dishes', {
            templateUrl:'dishes/dishesTemplate.html',
            controller:'dishesController',
            controllerAs:'dishes'
        })
        .when('/dish', {
            templateUrl:'dish/dishTemplate.html',
            controller:'dishController',
            controllerAs:'dish'
        })
        .when('/dish_edit', {
            templateUrl:'dish_edit/dishEditTemplate.html',
            controller:'dishEditController',
            controllerAs:'dish_edit'
        })
        .when('/dish_new', {
            templateUrl:'dish_new/newDishTemplate.html',
            controller:'newDishController',
            controllerAs:'dish_new'
        })
        .when('/request_create', {
            templateUrl:'request_create/createRequestTemplate.html',
            controller:'createRequestController',
            controllerAs:'request_create'
        })
        .when('/request_send', {
            templateUrl:'request_send/sendRequestTemplate.html',
            controller:'sendRequestController',
            controllerAs:'request_send'
        })
        .when('/restaurant_requests', {
            templateUrl:'restaurant_requests/restaurantRequestsTemplate.html',
            controller:'restaurantRequestsController',
            controllerAs:'restaurant_requests'
        })
        .when('/restaurant_verification', {
            templateUrl:'restaurant_verification/dishVerificationTemplate.html',
            controller:'dishVerificationController',
            controllerAs:'restaurant_verification'
        })
        .when('/nutritionist', {
            templateUrl:'nutritionist/nutritionistTemplate.html',
            controller:'nutritionistController',
            controllerAs:'nutritionist'
        })
        .when('/nutritionist_select', {
            templateUrl:'nutritionist_select/selectRestaurantTemplate.html',
            controller:'selectRestaurantController',
            controllerAs:'nutritionist_select'
        })
        .otherwise({
            redirectTo: '/welcome'
        });
    }



    function run($rootScope, $http, $localStorage) {
        if ($localStorage.findFoodUser) {
            try {
                let jwt = $localStorage.findFoodUser.token;
                let payload = JSON.parse(atob(jwt.split('.')[1]));

                let currentTime = parseInt(new Date().getTime() / 1000);
                console.log('currentTime ' + currentTime );/////////////////////////////////
                if (currentTime > payload.exp) {
                    console.log("Token is expired!!!");
                    delete $localStorage.findFoodUser;
                    $http.defaults.headers.common.Authorization = '';
                }
            } catch (e) {
            }

            if ($localStorage.findFoodUser) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.findFoodUser.token;
            }
        }


    }
})();

angular.module('findFood').controller('indexController', function ($rootScope, $scope, $http, $location, $localStorage) {

    $scope.tryToAuth = function () {
//        var headers = {
//                    'Access-Control-Allow-Origin': true,
//                    'Origin',
//                    'Access-Control-Request-Headers': 'Authorization',
//                    'Access-Control-Request-Method': 'POST',
//                    'Content-Type': 'application/json; charset=utf-8',
//                    "X-Requested-With": "XMLHttpRequest"
//        }
//        $http.post('http://localhost:8100/ff-auth/api/v1/authenticate', $scope.user, {headers})
//        $http.post('http://localhost:8100/ff-auth/api/v1/authenticate', $scope.user)
//        $http.post('http://localhost:5555/auth/api/v1/authenticate', $scope.user, {headers})
        $http.post('http://localhost:5555/auth/api/v1/authenticate', $scope.user)
            .then(function successCallback(response) {

                if (response.data.jwt) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.jwt;
                    $localStorage.findFoodUser = {email: $scope.user.email, token: response.data.jwt};
                    $rootScope.getRole();

                    $scope.user.email = null;
                    $scope.user.password = null;

                    $scope.defineDestination();

                }
            }, function errorCallback(response) {
            });
    };

    //определение домашней страницы
    $scope.defineDestination = function () {

        if($localStorage.findFoodUser.roles == 'NUTRITIONIST'){
            $location.path('nutritionist');
        } else if($localStorage.findFoodUser.roles == 'RESTAURANT'){
            $scope.setCurrentRestaurant();
            $location.path('restaurant');
        } else {
            $location.path('/');
        }
    };

    $scope.setCurrentRestaurant = function () {
//        $http.get('http://localhost:8189/ff-restaurants/api/v1/restaurants/email/' + $localStorage.findFoodUser.email)
        $http.get('http://localhost:5555/rest/api/v1/restaurants/email/' + $localStorage.findFoodUser.email)
            .then(function (response) {
                $localStorage.currentRestaurant = response.data;
            });
    };


    $rootScope.getRole = function () {
        let jwt = $localStorage.findFoodUser.token;
        let data = JSON.parse(atob(jwt.split('.')[1]));
        $localStorage.findFoodUser.roles = data.roles;
    };

    $scope.tryToLogout = function () {
        $scope.clearUser();
        delete $localStorage.currentRestaurant;
        delete $localStorage.guestMailBoxId;
        $location.path('welcome');
    };

    $scope.clearUser = function () {
        $localStorage.findFoodUser.roles = '';
        delete $localStorage.findFoodUser;
        $http.defaults.headers.common.Authorization = '';
    };

    $rootScope.isUserLoggedIn = function () {
        if ($localStorage.findFoodUser) {
            return true;
        } else {
            return false;
        }
    };

    //проверка текущей страницы
    $rootScope.isCurrentPageNutritionistSelect = function () {
        if ($rootScope.currentPage == 'nutritionist_select') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageNutritionist = function () {
        if ($rootScope.currentPage == 'nutritionist') {
            return true;
        } else {
            return false;
        }
    };


    $rootScope.isCurrentPageDish = function () {
        if ($rootScope.currentPage == 'dish') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageEditDish = function () {
        if ($rootScope.currentPage == 'dish_edit') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageAddNewDish = function () {
        if ($rootScope.currentPage == 'dish_new') {
            return true;
        } else {
            return false;
        }
    };


    $rootScope.isCurrentPageDishes = function () {
        if ($rootScope.currentPage == 'dishes') {
            return true;
        } else {
            return false;
        }
    };


    $rootScope.isCurrentPageRestaurantEditInfo = function () {
        if ($rootScope.currentPage == 'restaurant_edit_info') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageRestaurantInfo = function () {
        if ($rootScope.currentPage == 'restaurant_info') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageRestaurant = function () {
        if ($rootScope.currentPage == 'restaurant') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageRestaurants = function () {
        if ($rootScope.currentPage == 'restaurants') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageCreateRequest = function () {
        if ($rootScope.currentPage == 'request_create') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageSendRequest = function () {
        if ($rootScope.currentPage == 'request_send') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageRestaurantRequests = function () {
        if ($rootScope.currentPage == 'restaurant_requests') {
            return true;
        } else {
            return false;
        }
    };



    $rootScope.isCurrentPageDishVerification = function () {
        if ($rootScope.currentPage == 'restaurant_verification') {
            return true;
        } else {
            return false;
        }
    };


});