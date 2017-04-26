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
            alert($scope.matchedlistusers[0].other_user);
        });

        $scope.toggleFavorite = function(matchedUser) {
            backendService.addToFavorites(matchedUser.other_user_uid);
            alert("here");
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