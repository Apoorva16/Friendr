angular
	.module('example')
	.controller('preferenceController', function($scope,supersonic,$http,backendService){
		$scope.studyKey = [];
		$scope.workoutKey = [];
		$scope.eatKey = [];
		$scope.eat;
		$scope.workout;
		$scope.study;
		$scope.test;
		// $scope.eatPreferrence = ["Location": "", "Preferred Match Gender": ""];
		// $scope.workoutPreferrence = ["Work Out Type": "", "Preferred Match Gender": ""];
		// $scope.studyPreference = ["Location": "", "Preferred Match Gender": "", "Subject": ""];



		$http.get('http://api.purdue.io/odata/Subjects').then(function(data) {
				$scope.courses = data.data.value;
				//supersonic.logger.log($scope.courses);
		}).catch(function(err){
			supersonic.logger.log("error " + 	err);
		}) 

		backendService.getPreferenceList("Eat").then(function(data) {
			$scope.eat = data;
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					$scope.eatKey.push(key);
				}
			}
		})
		backendService.getPreferenceList("Study").then(function(data) {
			$scope.study = data;
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					supersonic.logger.log($scope.study[key]);
					$scope.studyKey.push(key);
				}
			}
		})
		backendService.getPreferenceList("Work Out").then(function(data) {
			$scope.workout = data;
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					supersonic.logger.log($scope.workout[key]);
					$scope.workoutKey.push(key);
				}
			}
		})

		$scope.submitEat = function(value) {
			// supersonic.logger.log($scope.eatKey);
			// supersonic.logger.log($scope.studyKey);
			backendService.setPreferencesForUser("Eat", value);
		}
		$scope.submitWorkout = function(value) {
			// supersonic.logger.log($scope.eatKey);
			// supersonic.logger.log($scope.studyKey);
			backendService.setPreferencesForUser("Work Out", value);
		}
		$scope.submitStudy = function(value) {
			// supersonic.logger.log($scope.eatKey);
			// supersonic.logger.log($scope.studyKey);
			backendService.setPreferencesForUser("Study", value);
		}
	})