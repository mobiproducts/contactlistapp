//connect controller with the index.html file
//in index.html just before </body> type<script src="controllers/controller.js"></script>

var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http){
    console.log("Hello from the controller")

    // auto refresh to show data on browser right away
    var refresh = function(){
        $http.get('/contactlist').success(function(response){
            //console.log("I got the data I resquested");
            $scope.contactlist = response;
            $scope.contact = "";
        });
    };

    refresh();

    //define add contact function
    $scope.addContact = function(){
        //display contact properties in input boxes
        console.log($scope.contact);
        //send data from input boxes to server
        $http.post('/contactlist', $scope.contact).success(function(response){
            console.log('successfully add contact' + response);
            refresh();
        });

    };

    //define remove a specific contact
    $scope.remove = function (id) {
        console.log('remove this id: ' + id);
        //delete a specific url id
        $http.delete('/contactlist/' + id).success(function(response){
            console.log('successfully remove contact' + response);
            refresh();
        });
    };

    //define a function for edit http.get specific id url
    //and put response to contact input boxes using $scope.contact
    $scope.edit = function (id) {
        console.log('edit id: ' + id);
        //edit a specific url id
        $http.get('/contactlist/' + id).success(function(response){
            console.log('finding a specific contact' + response);
            $scope.contact = response
        });

    };

    //define a function for update http.get specific id url
    $scope.update = function(){
        //test on console
        console.log($scope.contact._id);

        //http.put data from input boxes($scope.contact) by finding
        // a specific id url and send it to server)
        //refresh after
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){

            refresh();

        });

    };
    $scope.cancel = function(){
        $scope.contact = "";
    }
}]);