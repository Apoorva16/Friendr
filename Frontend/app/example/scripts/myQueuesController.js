angular
    .module('example')
    .controller('myQueuesController', function($scope, supersonic,backendService) {

    backendService.getQueueList().then(function(data) {
        $scope.activities = data;
        $scope.queueKeys = Object.keys(data);
        $scope.$apply();

    })

    document.addEventListener("visibilitychange", onVisibilityChange, false);

    function onVisibilityChange() {
        location.reload();
    }   


    $scope.editQueue = function(key) {
        window.localStorage.setItem('activity',JSON.stringify($scope.activities[key]));
        window.localStorage.setItem('activityName',key);

        var view = new supersonic.ui.View("example#editQueue");
        supersonic.ui.layers.push(view);

    }
    });