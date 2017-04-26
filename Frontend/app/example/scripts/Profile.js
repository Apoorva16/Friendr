angular
    .module('example')
    .controller('Profile', function($scope, supersonic,backendService) {

        var userObj = JSON.parse(window.localStorage.getItem("userObj"));
        $scope.userObj = userObj;
        $scope.profileImage = userObj.photoURL;
        // var userObj = JSON.parse(window.localStorage.getItem("userObj"));
        // $scope.PictureLink = userObj.PictureLink;
        $scope.description = "";

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
                // s


                /* SUPER IDEAL
                1. First user selects image.
                2. Appgyver gives to us a base64 string.
                3. we need to make api call to send this image to firebase.
                4. backend should host the image, which means we get a hyperlink for it. www.aws/s3/myimage ...
                5. backend should send us this URL in the userObj they send us on login.
                 */

                /* How we did it for Sprint 2.
                 1. First user selects image.
                 2. Appgyver gives to us a base64 string.
                 3. We save this entire image itself (which is a base64 string) into 'photoURL'
                 4. photoURL is something firebase already includes when in the default userObj, which we get upon login.
                 */

                // var user = firebase.auth().currentUser;
                firebase.auth().onAuthStateChanged(function(currentUser) {
                    // if (currentUser) {
                    //     {
                    //         database.ref('Users/' + currentUser.uid + '/Profile').update({
                    //             PictureLink: $scope.profileImage
                    //         });
                    //     }
                        currentUser.updateProfile({
                            photoURL: $scope.profileImage  /*is base64 */
                        });
                    // }
                });

                userObj.photoURL = result;
                // userObj.PictureLink = result;
                // window.localStorage.setItem("userObj", JSON.stringify(userObj) + "");
                window.localStorage.setItem("userObj", JSON.stringify(currentUser) + "");

                // console.log("JSON.stringify(userObj)");
            });
        };

        $scope.aboutme = function() {

            // var user = firebase.auth().currentUser;
            firebase.auth().onAuthStateChanged(function(currentUser) {
                if (currentUser) {
                    alert("I'm here");
                    database.ref('Users/' + user.uid + '/Profile').update({
                        AboutMe: $scope.description
                    });
                    alert("I'm here2");
                }
                alert("I'm here3");
                window.localStorage.setItem("userObj", JSON.stringify(currentUser) + "");
                alert("Your changes have been made");
            })
                .catch(function(error) {
                    alert(JSON.stringify(error));
                    alert("Your changes were not made");
                });

        };

    });/**
 * Created by apoorvaparmar on 3/29/17.
 */
