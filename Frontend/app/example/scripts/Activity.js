/**
 * Created by apoorvaparmar on 4/25/17.
 */
/**
 * Created by apoorvaparmar on 3/29/17.
 */
angular
    .module('example')
    .controller('Activity', function($scope, supersonic, backendService) {

        $scope.matchedlistusers;

        backendService.viewConversationList().then(function (value) {
            $scope.$apply();
            $scope.matchedlistusers = value;
            $scope.$apply();

            $scope.favoritesList = backendService.getFavoritesList();
            alert(JSON.stringify($sope.favoritesList));

          // alert($scope.matchedlistusers[0].other_user);
        });

        $scope.toggleFavorite = function(matchedUser) {
            matchedUser.isFavorite = !matchedUser.isFavorite;
            //alert(matchedUser.other_user_uid);

            //firebase.auth().onAuthStateChanged(function(user) {
            //    alert("BOO");
            //var user = firebase.auth().currentUser;
            //if (user) {
            //    var other_name;
            //    database.ref('Users').once('value' ).then(function(snapshot)
            //    {
            //        if (!snapshot.child(matchedUser.other_user_uid).exists()) {
            //            alert("HERE");
            //            console.log("uid not found");
            //        }
            //        else {
            //            alert("HERE2");
            //            database.ref('Users/'+ matchedUser.other_user_uid + '/Profile').once('value').then(function(snapshot)
            //            {
            //                firstName = snapshot.child("FirstName").val();
            //                lastName = snapshot.child("LastName").val();
            //
            //                database.ref('Users/' + user.uid + '/Favorites/' + matchedUser.other_user_uid).set({
            //                    FirstName: firstName,
            //                    LastName: lastName
            //                });
            //            });
            //        }
            //    });
            //}
        };

       /* $scope.searchforuser = function() {

            var matchedUser = new Promise(function(resolve, reject)
            {
                firebase.auth().onAuthStateChanged(function(user)
                {
                    if (user)
                    {
                        database.ref('Users/' + user.uid + '/Match_List').once('value').then(function(snapshot)
                        {
                            snapshot.forEach(function(childSnapshot)
                            {
                                var other_uid = childSnapshot.key;
                                database.ref('Users/' + other_uid + '/Profile').once('value').then(function(snapshot1)
                                {
                                    var other_user = snapshot1.val();
                                    if (srchFirstName == other_user.FirstName)
                                    {
                                        if (srchLastName == other_user.LastName)
                                        {
                                            resolve(other_user);
                                        }
                                        else
                                        {
                                            resolve("None Found.")
                                        }
                                    }
                                    else
                                    {
                                        resolve("None Found.")
                                    }
                                });
                            });
                        });
                    }
                });
            });

            return matchedUser;

        };*/
});