/**
 * Created by apoorvaparmar on 1/14/17.
 */

angular
    .module('example')
    .controller('DrawerController', function($scope, supersonic,backendService) {

        $scope.logout = function() {
            supersonic.ui.initialView.show();
            //supersonic.ui.dialog.alert("Say hello");
        };

        $scope.preference = function() {
            //supersonic.logger.log("hi");
            var view = new supersonic.ui.View("example#preference");
            supersonic.ui.layers.push(view);
            supersonic.ui.drawers.close();
        };

        $scope.messages = function(){
            var view = new supersonic.ui.View("example#getting-started");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(view, options);
        };

        $scope.queues = function() {
            var view = new supersonic.ui.View("example#myQueues");
            supersonic.ui.layers.push(view);
            supersonic.ui.drawers.close();

        }


    });