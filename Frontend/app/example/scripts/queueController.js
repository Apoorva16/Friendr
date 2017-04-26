angular
.module('example')
.controller('queueController', function($scope,supersonic,$http,backendService){
    $scope.activity = window.localStorage.getItem('activity');
    $scope.activity = $scope.activity.replace(/^"(.*)"$/, '$1');
    $scope.data = window.localStorage.getItem('preferences');
    $scope.preferences = JSON.parse($scope.data);
    $scope.keys = Object.keys($scope.preferences);
    $scope.test = {};
    $scope.submit = function() {
    backendService.enterQueue($scope.activity, $scope.test);
    supersonic.ui.layers.pop();
    }
})