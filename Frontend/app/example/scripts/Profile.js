angular
    .module('example')
    .controller('Profile', function($scope, supersonic,backendService) {

        var userObj = JSON.parse(window.localStorage.getItem("userObj"));
        $scope.profileImage = userObj.photoURL;

        $scope.choosePhoto = function() {
            var options = {
                quality: 50,
                allowEdit: true,
                targetWidth: 300,
                targetHeight: 300,
                encodingType: "jpeg",
                destinationType: "dataURL"
            };
            supersonic.media.camera.getFromPhotoLibrary(options).then( function(result){
                // save it in database
                $scope.profileImage = result;

                var user = firebase.auth().currentUser;
                user.updateProfile({
                    photoURL: result
                });

                userObj.photoURL = result;
                window.localStorage.setItem("userObj", JSON.stringify(userObj));

                // alert()
            });
        };

    });/**
 * Created by apoorvaparmar on 3/29/17.
 */
