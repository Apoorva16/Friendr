/**
 * Created by apoorvaparmar on 1/14/17.
 */
angular
    .module('example')
    .controller('SignupController', function($scope, supersonic) {

        $scope.close = function() {
            supersonic.ui.modal.hide();

        };

    });