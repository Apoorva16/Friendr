angular
    .module('example')
    .controller('FAQController', function($scope, supersonic,backendService) {

        $scope.faqs = function() {

            // supersonic.ui.dialog.alert("Signup working Yo");


            var modalView = new supersonic.ui.View("example#faq");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };

    });
