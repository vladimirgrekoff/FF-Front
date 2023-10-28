angular.module('findFood').controller('clientQuestionEditController', function ($rootScope, $scope, $http, $location, $localStorage, $window) {

    const contextPath = 'http://localhost:5555/personal/api/v1';

    //включение дополнительных пунктов меню для страницы
    $rootScope.currentPage = 'client_questionnaire_edit';


    $scope.currentClient = $localStorage.currentClient;

    $scope.currentClientName = $localStorage.currentClient.username;

    //переменные для проверки внесеия изменений
    $scope.username = $scope.currentClient.username;
    $scope.sex = $scope.currentClient.sex;
    $scope.birthdate = $scope.currentClient.birthdate;
    $scope.weight = $scope.currentClient.weight;
    $scope.height = $scope.currentClient.height;
    $scope.activity_title = $scope.currentClient.activity_title;
    $scope.goal_title = $scope.currentClient.goal_title;

    $scope.sexList = $localStorage.sexList;
    $scope.activityList = $localStorage.activityList;
    $scope.goalList = $localStorage.goalList;

    //данные для правки
    $scope.getCurrentClientForEdit = function(){
        $http.get(contextPath + '/persons/email/' + $localStorage.findFoodUser.email)
            .then(function successCallback(response) {
                $scope.editedClient = response.data;
            }, function errorCallback(response) {
            });
    };

    //инициализация селекторов
    $scope.isInitSexValue = function(){
        for(k=0; k<$scope.sexList.length; k++){
            if($scope.sexList[k] == $scope.sex){
                return $scope.sexTitle = $scope.sexList[k];
            }
        }
    };

    $scope.isInitActivityValue = function(){
        for(i=0; i<$scope.activityList.length; i++){
            if($scope.activityList[i] == $scope.activity_title){
                return $scope.activityTitle = $scope.activityList[i];
            }
        }
    };

    $scope.isInitGoalValue = function(){
        for(j=0; j<$scope.goalList.length; j++){
            if($scope.goalList[j] == $scope.goal_title){
                return $scope.goalTitle = $scope.goalList[j];
            }
        }
    };

    $scope.updateQuestionnaire = function(){
        $scope.editedClient.sex = $scope.sexTitle;
        $scope.editedClient.activity_title = $scope.activityTitle;
        $scope.editedClient.goal_title = $scope.goalTitle;

        var editedClient = $scope.editedClient;
        if($scope.checkForChanges(editedClient)){
            $http.put(contextPath + '/persons/questionnaire', editedClient)
                .then(function (response) {
                    $scope.editedClient.username = null;
                    $scope.editedClient.birthdate = null;
                    $scope.editedClient.weight = null;
                    $scope.editedClient.height = null;
                    $scope.sexTitle = '';
                    $scope.activityTitle = '';
                    $scope.goalTitle = '';
                    alert("Изменения в БД внесены");
                }, function errorCallback(response) {
                    $rootScope.showAlertWindow(response);
                });
        }
    };

    $scope.checkUsername = function(){
        $http.get(contextPath + '/persons/check/' + $scope.editedClient.username)
            .then(function (response) {
                if(response.data){
                    $scope.updateQuestionnaire();
                }else{
                    alert('Имя пользователя ' + $scope.editedClient.username + ' уже используется!!!');
                }
            });
    };


    $scope.updateClientQuestionnaire = function(){
        if ($scope.isEmptyClientQuestionnaireData() == false){
            if ($scope.editedClient.username != $scope.username){
                $scope.checkUsername();
            }else{
                $scope.updateQuestionnaire();
            }
        }
    };

    $scope.checkForChanges = function(after){
        if($scope.username == after.username &&
        $scope.sex == after.sex &&
        $scope.birthdate == after.birthdate &&
        $scope.weight == after.weight &&
        $scope.height == after.height &&
        $scope.activity_title == after.activity_title &&
        $scope.goal_title == after.goal_title){
                alert("При выполнении правки анкеты пользователя не внесено " +
                    "\nни одного изменения! " +
                    "\nВыполнять обращение к базе данных не имеет смысла. " +
                    "\nВы можете вернуться на страницу просмотра анкеты " +
                    "\nили продолжить внесение изменений.");
                return false;
           }
        return true;
    };

    $scope.undoChanges = function(){
        if($scope.username != $scope.editedClient.username){
            $scope.editedClient.username = $scope.username;
        }
        if($scope.sex != $scope.editedClient.sex){
            $scope.editedClient.sex = $scope.sex;
        }
        if($scope.birthdate != $scope.editedClient.birthdate){
            $scope.editedClient.birthdate = $scope.birthdate;
        }
        if($scope.weight != $scope.editedClient.weight){
            $scope.editedClient.weight = $scope.weight;
        }
        if($scope.height != $scope.editedClient.height){
            $scope.editedClient.height = $scope.height;
        }
        if($scope.activity_title != $scope.editedClient.activity_title){
            $scope.editedClient.activity_title = $scope.activity_title;
        }
        if($scope.goal_title != $scope.editedClient.goal_title){
            $scope.editedClient.goal_title = $scope.goal_title;
        }
    };

    $scope.isEmptyClientQuestionnaireData = function(){
        if($scope.editedClient == undefined || $scope.editedClient == null){
            alert("При правке анкеты все поля должны быть заполнены!");
            return true;
        }
        if($scope.editedClient.username == undefined || $scope.editedClient.username == null || $scope.editedClient.username == ''){
            alert("Поле 'Имя в сети (nick)' должно быть заполнено!");
            return true;
        }
        if($scope.sexTitle == undefined || $scope.sexTitle == ''){
            alert("'Пол' должен иметь одно из значений в списке 'Выбор пола'!");
            return true;
        }
        if($scope.editedClient.birthdate == undefined || $scope.editedClient.birthdate == null || $scope.editedClient.birthdate == ''){
            if(angular.isNumber($scope.editedClient.birthdate) == false){
                alert("Поле 'Дата рождения' должно быть заполнено!");
                return true;
            }
        }
        if($scope.editedClient.weight == undefined || $scope.editedClient.weight == null || $scope.editedClient.weight == ''){
            if(angular.isNumber($scope.editedClient.weight) == false){
                alert("Поле 'Вес в килограммах' должно быть заполнено!");
                return true;
            }
        }
        if($scope.editedClient.height == undefined || $scope.editedClient.height == null || $scope.editedClient.height == ''){
            if(angular.isNumber($scope.editedClient.height) == false){
                alert("Поле 'Рост' должно быть заполнено!");
                return true;
            }
        }
        if($scope.activityTitle == undefined || $scope.activityTitle == ''){
            alert("'Уровень физической нагрузки' должен иметь одно из значений в списке 'Выбор нагрузки'!");
            return true;
        }

        if($scope.goalTitle == undefined || $scope.goalTitle == ''){
            alert("'Цель (желаемый вес)' должен иметь одно из значений в списке 'Желаемый вес'!");
            return true;
        }
        return false;
    };

    //переходы
    $scope.showQuestionnairePage = function () {
            $location.path('client_questionnaire');
    };

    $scope.getCurrentClientForEdit();
});