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
        .when('/confirmation', {
            templateUrl:'registration_dir/confirmation/confirmationTemplate.html',
            controller:'confirmationController',
            controllerAs:'confirmation'

        })
        .when('/change_password', {
            templateUrl:'registration_dir/password_change/changePasswordTemplate.html',
            controller:'changePasswordController',
            controllerAs:'change_password'

        })
        .when('/change_email', {
            templateUrl:'registration_dir/email_change/changeEmailTemplate.html',
            controller:'changeEmailController',
            controllerAs:'change_email'

        })
        .when('/employees', {
            templateUrl:'admin_dir/employees/employeesTemplate.html',
            controller:'employeesController',
            controllerAs:'employees'
        })
        .when('/admin', {
            templateUrl:'admin_dir/admin/adminTemplate.html',
            controller:'adminController',
            controllerAs:'admin'
        })
        .when('/roles_edit', {
            templateUrl:'admin_dir/roles_edit/rolesTemplate.html',
            controller:'rolesController',
            controllerAs:'roles_edit'
        })
        .when('/help', {
            templateUrl:'help_dir/indexHelpTemplate.html',
            controller:'indexHelpController',
            controllerAs:'help'

        })
        .when('/change_registration', {
            templateUrl:'help_dir/reg_data/change_registrationHelpTemplate.html',
            controller:'change_registrationHelpController',
            controllerAs:'change_registration'

        })
        .when('/change_username', {
            templateUrl:'help_dir/user_name/change_usernameHelpTemplate.html',
            controller:'change_usernameHelpController',
            controllerAs:'change_username'

        })
        .when('/filling_questionnaire', {
            templateUrl:'help_dir/questionnaire/filling_questionnaireHelpTemplate.html',
            controller:'filling_questionnaireHelpController',
            controllerAs:'filling_questionnaire'

        })
        .when('/restaurants', {
            templateUrl:'restaurants_dir/restaurants/restaurantsTemplate.html',
            controller:'restaurantsController',
            controllerAs:'restaurants'
        })
        .when('/restaurant', {
            templateUrl:'restaurants_dir/restaurant/restaurantTemplate.html',
            controller:'restaurantController',
            controllerAs:'restaurant'
        })
        .when('/restaurant_info', {
            templateUrl:'restaurants_dir/restaurant_info/restaurantInfoTemplate.html',
            controller:'restaurantInfoController',
            controllerAs:'restaurant_info'
        })
        .when('/restaurant_edit_info', {
            templateUrl:'restaurants_dir/restaurant_edit_info/restaurantEditInfoTemplate.html',
            controller:'restaurantEditInfoController',
            controllerAs:'restaurant_edit_info'
        })
        .when('/dishes', {
            templateUrl:'restaurants_dir/dishes/dishesTemplate.html',
            controller:'dishesController',
            controllerAs:'dishes'
        })
        .when('/dish', {
            templateUrl:'restaurants_dir/dish/dishTemplate.html',
            controller:'dishController',
            controllerAs:'dish'
        })
        .when('/dish_edit', {
            templateUrl:'restaurants_dir/dish_edit/dishEditTemplate.html',
            controller:'dishEditController',
            controllerAs:'dish_edit'
        })
        .when('/dish_new', {
            templateUrl:'restaurants_dir/dish_new/newDishTemplate.html',
            controller:'newDishController',
            controllerAs:'dish_new'
        })
        .when('/dish_verification', {
            templateUrl:'restaurants_dir/dish_verification/dishVerificationTemplate.html',
            controller:'dishVerificationController',
            controllerAs:'dish_verification'
        })
        .when('/request_create', {
            templateUrl:'restaurants_dir/request_create/createRequestTemplate.html',
            controller:'createRequestController',
            controllerAs:'request_create'
        })
        .when('/request_send', {
            templateUrl:'restaurants_dir/request_send/sendRequestTemplate.html',
            controller:'sendRequestController',
            controllerAs:'request_send'
        })
        .when('/restaurant_requests', {
            templateUrl:'restaurants_dir/restaurant_requests/restaurantRequestsTemplate.html',
            controller:'restaurantRequestsController',
            controllerAs:'restaurant_requests'
        })
        .when('/nutritionist', {
            templateUrl:'nutritionist_dir/nutritionist/nutritionistTemplate.html',
            controller:'nutritionistController',
            controllerAs:'nutritionist'
        })
        .when('/nutritionists', {
            templateUrl:'nutritionist_dir/nutritionists/nutritionistsTemplate.html',
            controller:'nutritionistsController',
            controllerAs:'nutritionists'
        })
        .when('/nutritionist_select', {
            templateUrl:'nutritionist_dir/nutritionist_select/selectRestaurantTemplate.html',
            controller:'selectRestaurantController',
            controllerAs:'nutritionist_select'
        })
        .when('/user_registration', {
            templateUrl:'registration_dir/user_reg/userRegTemplate.html',
            controller:'userRegController',
            controllerAs:'user_registration'
        })
        .when('/restaurant_registration', {
            templateUrl:'registration_dir/restaurant_reg/restaurantRegTemplate.html',
            controller:'restaurantRegController',
            controllerAs:'restaurant_registration'
        })
        .when('/clients', {
            templateUrl:'users_dir/users/clientsTemplate.html',
            controller:'clientsController',
            controllerAs:'clients'
        })
        .when('/client', {
            templateUrl:'users_dir/user/clientTemplate.html',
            controller:'clientController',
            controllerAs:'client'
        })
        .when('/client_info', {
            templateUrl:'users_dir/user_info/clientInfoTemplate.html',
            controller:'clientInfoController',
            controllerAs:'client_info'
        })
        .when('/client_info_edit', {
            templateUrl:'users_dir/user_info_edit/clientInfoEditTemplate.html',
            controller:'clientInfoEditController',
            controllerAs:'client_info_edit'
        })
        .when('/client_questionnaire', {
            templateUrl:'users_dir/user_questionnaire/clientQuestionTemplate.html',
            controller:'clientQuestionController',
            controllerAs:'client_questionnaire'
        })
        .when('/client_questionnaire_edit', {
            templateUrl:'users_dir/user_questionnaire_edit/clientQuestionEditTemplate.html',
            controller:'clientQuestionEditController',
            controllerAs:'client_questionnaire_edit'
        })
        .when('/menu', {
            templateUrl:'menu_dir/menuTemplate.html',
            controller:'menuController',
            controllerAs:'menu'
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
                $rootScope.showAlertWindow(response);
            });
    };

    //определение домашней страницы
    $scope.defineDestination = function () {
        if($rootScope.hasRole('ADMIN')){
            $location.path('admin');
        } else if($rootScope.hasRole('NUTRITIONIST')){
            $location.path('nutritionist');
        } else if($rootScope.hasRole('RESTAURANT')){
            $location.path('restaurant');
        } else if($rootScope.hasRole('CLIENT')){
            $location.path('client');
        } else {
            $location.path('welcome');
        }
    };



    //получить роли в хранилище
    $rootScope.getRole = function () {
        let jwt = $localStorage.findFoodUser.token;
        let data = JSON.parse(atob(jwt.split('.')[1]));
        $localStorage.findFoodUser.roles = data.roles;
    };

    //проверка наличия роли у пользователя
    $rootScope.hasRole = function(check) {
        if(!$localStorage.findFoodUser){
            return false;
        }
        var roles = $localStorage.findFoodUser.roles;
        if (roles != null) {
            for (i=0; i<roles.length; i++){
                if (check == roles[i]) {
                    return true;
                }
            }
        }
        return false;
    };

    //выход пользователя
//    $scope.tryToLogout = function () {
    $rootScope.tryToLogout = function () {
        $location.path('welcome');
        $scope.clearUser();
        $localStorage.$reset();
    };



    $scope.clearUser = function () {
        $http.defaults.headers.common.Authorization = '';
    };



    $rootScope.isUserLoggedIn = function () {
        if ($localStorage.findFoodUser) {
            return true;
        } else {
            return false;
        }
    };


    //окно сообщений о ошибке
    $rootScope.showAlertWindow = function (response) {
        if(response.data.status != null && response.data.status != '' && response.data.status != undefined ){
            m = response.data.status + "\n";
        }
        if(response.data.statusCode != null && response.data.statusCode != '' && response.data.statusCode != undefined ){
            m = response.data.statusCode + "\n";
        }
        if(response.data.error != null && response.data.error != '' && response.data.error != undefined ){
            m = m + response.data.error + "\n";
        }
        if(response.data.message != null && response.data.message != '' &&  response.data.message != undefined ){
            m = m + response.data.message;
        }
        alert(m);
    };

    //проверка текущей страницы

    //для ПОЛЬЗОВАТЕЛЕЙ

    $rootScope.isCurrentPageWelcome = function () {
        if ($rootScope.currentPage == 'welcome') {
            return true;
        } else {
            return false;
        }
    };
    //домашняя пользователя
    $rootScope.isCurrentPageClient = function () {
        if ($rootScope.currentPage == 'client') {
            return true;
        } else {
            return false;
        }
    };
    //список пользователей
    $rootScope.isCurrentPageClients = function () {
        if ($rootScope.currentPage == 'clients') {
            return true;
        } else {
            return false;
        }
    };
    //профиль
    $rootScope.isCurrentPageClientProfile = function () {
        if ($rootScope.currentPage == 'client_info') {
            return true;
        } else {
            return false;
        }
    };
    //правка профиля
    $rootScope.isCurrentPageClientEditProfile = function () {
        if ($rootScope.currentPage == 'client_info_edit') {
            return true;
        } else {
            return false;
        }
    };
    //анкета
    $rootScope.isCurrentPageClientQuestion = function () {
        if ($rootScope.currentPage == 'client_questionnaire') {
            return true;
        } else {
            return false;
        }
    };
    //правка анкеты
    $rootScope.isCurrentPageClientEditQuestion = function () {
        if ($rootScope.currentPage == 'client_questionnaire_edit') {
            return true;
        } else {
            return false;
        }
    };



    //____________________для пользователей добавлять выше этой черты
    //для АДМИНИСТРАТОРА
    $rootScope.isCurrentPageAdmin = function () {
        if ($rootScope.currentPage == 'admin') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageEditRoles = function () {
        if ($rootScope.currentPage == 'roles_edit') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageEmployees = function () {
        if ($rootScope.currentPage == 'employees') {
            return true;
        } else {
            return false;
        }
    };

    //____________________для админа добавлять выше этой черты
    //для РЕГИСТРАЦИИ
    $rootScope.isCurrentPageUserRegistration = function () {
        if ($rootScope.currentPage == 'user_registration') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageRestaurantRegistration = function () {
        if ($rootScope.currentPage == 'restaurant_registration') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageConfirmation = function () {
        if ($rootScope.currentPage == 'confirmation') {
            return true;
        } else {
            return false;
        }
    };


    $rootScope.isCurrentPageChangePassword = function () {
        if ($rootScope.currentPage == 'change_password') {
            return true;
        } else {
            return false;
        }
    };

    $rootScope.isCurrentPageChangeEmail = function () {
        if ($rootScope.currentPage == 'change_email') {
            return true;
        } else {
            return false;
        }
    };

    //____________________для регистрации добавлять выше этой черты

    //для ДИЕТОЛОГА
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

    $rootScope.isCurrentPageNutritionists = function () {
        if ($rootScope.currentPage == 'nutritionists') {
            return true;
        } else {
            return false;
        }
    };
    //____________________для диетолога добавлять выше этой черты

    //для БЛЮД
    $rootScope.isCurrentPageDishes = function () {
        if ($rootScope.currentPage == 'dishes') {
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


    $rootScope.isCurrentPageDishVerification = function () {
        if ($rootScope.currentPage == 'dish_verification') {
            return true;
        } else {
            return false;
        }
    };
    //____________________для блюд добавлять выше этой черты

    //для РЕСТОРАНОВ
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
    //____________________для ресторанов добавлять выше этой черты

    //для ПОДБОРА МЕНЮ НА ДЕНЬ
    $rootScope.isCurrentPageMenu = function () {
        if ($rootScope.currentPage == 'menu') {
            return true;
        } else {
            return false;
        }
    };
    //____________________для ПОДБОРА МЕНЮ НА ДЕНЬ добавлять выше этой черты

    //для СПРАВКИ
    $rootScope.isCurrentPageHelp = function () {
        if ($rootScope.currentPage == 'help') {
            return true;
        } else {
            return false;
        }
    };
    //____________________для ПОДБОРА МЕНЮ НА ДЕНЬ добавлять выше этой черты
    //показ меню вне страниц регистрации и скрытие на них
    $rootScope.isCurrentPageWithNavBar = function () {
        if (($rootScope.currentPage != 'restaurant_registration') && ($rootScope.currentPage != 'user_registration')) {
            return true;
        } else {
            return false;
        }
    };

});