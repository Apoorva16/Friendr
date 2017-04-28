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

        $scope.currentUser = null;

        $scope.populateMatchedUserList = function(user) {
            firebase.database().ref('Users/' + user.other_user_uid + '/Profile').once('value').then(function(snapshot) {
                var element = {
                    uid: user.other_user_uid,
                    profile : {
                        FirstName : snapshot.val().FirstName,
                        LastName : snapshot.val().LastName,
                        UserName : snapshot.val().UserName,
                        Gender : snapshot.val().Gender,
                        Image : snapshot.val().Image
                    },
                    isFavorite : $scope.favorites.indexOf(user.other_user_uid) != -1
                };
                $scope.matchedlistusers.push(element);
                $scope.$apply();
            });
        };

        backendService.viewConversationList().then(function (value) {
            $scope.$apply();
            $scope.matchedlistusers = [];

            $scope.favorites = [];
            firebase.auth().onAuthStateChanged(function(currentUser) {
                $scope.currentUser = currentUser;
                firebase.database().ref('Users/' + currentUser.uid + '/Favorites').once('value').then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var other_uid = childSnapshot.key;
                        $scope.favorites.push(other_uid);
                    });

                    for(var index = 0; index < value.length; index++) {
                        var user = value[index];
                        $scope.populateMatchedUserList(user);
                    }
                    $scope.$apply();
                });
            });

            //$scope.favoritesList = backendService.getFavoritesList();
          // alert($scope.matchedlistusers[0].other_user);
        });

        $scope.toggleFavorite = function($index) {
            var matchedUser = $scope.matchedlistusers[$index];
            if(matchedUser.isFavorite) {
                firebase.database().ref('Users/' + $scope.currentUser.uid + '/Favorites/' + matchedUser.uid).remove();
                matchedUser.isFavorite = false;
                $scope.apply();
            } else {
                firebase.database().ref('Users/' + $scope.currentUser.uid + '/Favorites/' + matchedUser.uid).set({
                    FirstName: matchedUser.profile.FirstName,
                    LastName: matchedUser.profile.LastName
                });
                matchedUser.isFavorite = true;
                $scope.apply();
            }
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