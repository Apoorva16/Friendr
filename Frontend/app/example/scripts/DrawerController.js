/**
 * Created by apoorvaparmar on 1/14/17.
 */

angular
    .module('example')
    .controller('DrawerController', function($scope, supersonic) {

        $scope.logout = function() {


            supersonic.ui.initialView.show();
            //supersonic.ui.dialog.alert("Say hello");
        };
        $scope.myFunction = function(){
            var view = new supersonic.ui.View("example#getting-started");
            supersonic.ui.layers.push(view);
            supersonic.logger.log("Something semi-interesting just happened.");
            supersonic.ui.drawers.close();

        }


    });