angular
.module('example')
.controller('editQueueController', function($scope, supersonic,backendService) {

	$scope.data = window.localStorage.getItem('activity');
	$scope.activityName = window.localStorage.getItem('activityName');
	$scope.activity = JSON.parse($scope.data);
	$scope.test = $scope.activity.Preferences;
	backendService.getPreferenceList($scope.activityName).then(function(data) {
		$scope.preferences = data;
		$scope.keys = Object.keys($scope.preferences);
		$scope.$apply();
	})

	$scope.editQueue = function() {
		backendService.editQueue($scope.activityName,$scope.test);
		supersonic.ui.layers.pop();
	}
	$scope.leaveQueue = function() {
		backendService.leaveQueue($scope.activityName);
		supersonic.ui.layers.pop();

	}

});