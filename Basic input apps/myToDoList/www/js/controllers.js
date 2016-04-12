angular.module('starter.controllers', [])

.controller('ToDoListCtrl', function ($scope, $ionicModal) {

// array list which will contain the items added
$scope.toDoListItems = [
    {task: 'say',
    status: false},
    {task: 'stuart',
    status: false}
];
    

//init the modal
$ionicModal.fromTemplateUrl('modal.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function (modal) {
  $scope.modal = modal;
});

// function to open the modal
$scope.openModal = function () {
  $scope.modal.show();
};

// function to close the modal
$scope.closeModal = function () {
  $scope.modal.hide();
};

//Cleanup the modal when we're done with it!
$scope.$on('$destroy', function () {
  $scope.modal.remove();
});

//function to add items to the existing list
$scope.AddItem = function (data) {
  $scope.toDoListItems.push({
    task: data.newItem,
    status: data.newStatus
  });
data.newItem = '';
data.newStatus = '';
$scope.closeModal();
};
   
//complete item
$scope.completeItem = function (item) {
//$scope.item.status = true;
$scope.item.task = 'clicked';
};

    
});