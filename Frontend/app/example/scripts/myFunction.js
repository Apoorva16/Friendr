/**
 * Created by srishti on 2/19/17.
 */

     var myFunction = function($scope, supersonic,backendService) {

        var view = new supersonic.ui.View("example#message");
        supersonic.ui.layers.push(view);
    supersonic.logger.log("Something semi-interesting just happened.");

    };
