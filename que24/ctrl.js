const ang = angular.module("myApp", []);

ang.controller("ctrl", function ($scope, $http) {
  $scope.alltask = [];
  $scope.task = [];
  $scope.gettask = function () {
    $http.get("/data").then(function (response) {
      $scope.task = response.data;
      $scope.itemPerPage = 3;
      $scope.currentPage = 1;
      $scope.totalPages = Math.ceil($scope.task.length / $scope.itemPerPage);
      $scope.startIndex = 0;
      $scope.endIndex = $scope.itemPerPage;

      $scope.updatePagination();
    });
  };

  $scope.gettask();
  $scope.isupdatebtn = false;
  $scope.isaddbtn = true;
  $scope.addtask = function () {
    $http.post("/addtask", $scope.newrecord).then(function () {
      $scope.gettask();
      $scope.newrecord = {};
    });
  };

  $scope.deletetask = function (id) {
    $http.delete("/deltask/" + id).then(function () {
      $scope.gettask();
    });
  };

  $scope.edittask = function (id) {
    $http.put("/edit/" + id).then(function (res) {
      $scope.isupdatebtn = true;
      $scope.isaddbtn = false;
      $scope.newrecord = res.data;
    });
  };

  $scope.updatetask = function (id) {
    $http.put("/update", $scope.newrecord).then(function () {
      $scope.gettask();
      $scope.clearUpdate();
    });
  };

  $scope.clearUpdate = function () {
    $scope.newrecord = {};
    $scope.isupdatebtn = false;
    $scope.isaddbtn = true;
  };

  $scope.ascdesc = function (fnname) {
    if ($scope.name === fnname) {
      $scope.name = "-" + fnname;
    } else {
      $scope.name = fnname;
    }
  };

  $scope.updatePagination = () => {
    console.log($scope.task);
    $scope.startIndex = ($scope.currentPage - 1) * $scope.itemPerPage;
    $scope.endIndex = $scope.startIndex + $scope.itemPerPage;
    $scope.alltask = $scope.task.slice($scope.startIndex, $scope.endIndex);
    console.log($scope.alltask);
  };

  $scope.nextPage = () => {
    if ($scope.currentPage < $scope.totalPages) {
      $scope.currentPage++;
      $scope.updatePagination();
    }
  };

  $scope.prevPage = () => {
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
      $scope.updatePagination();
    }
  };

  $scope.updatePagination();
});
