const myApp = angular.module("myApp",["ng"]);

myApp.directive("userLogin",function () {
    return {
        template: '<h1 ng-show="user" id="user">hello {{data.profile.username}} ({{data.profile.email}})</h1>' +
            '<h1 ng-show="!user" class="user-error">{{error}}</h1>',
        controller: "currentUser"
    }
})
myApp.controller("currentUser",function ($scope,$http) {
    $scope.data = "no data"
    $http.get("api/v1/user").then(successCallBack,failureCallBack)
    
    function successCallBack(response) {
        $scope.data = response.data;
        $scope.user = true;
    }

    function failureCallBack(response) {
        $scope.error = response.data.error;
        $scope.user = false;
    }
})