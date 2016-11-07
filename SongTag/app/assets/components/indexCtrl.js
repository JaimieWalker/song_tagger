var app = angular.module("SongTag")
	.controller("indexCtrl", function($scope,musicService){
		$scope.songs
		if (!$scope.songs) {
			musicService.requestSongs().then(function success(res){
				$scope.songs = res.data
				$scope.totalItems = $scope.songs.length
			},
			function fail(err){

			});	
		}

		$scope.pageSize = 20
		$scope.currentPage = 4
		$scope.viewby = 10;
		$scope.itemsPerPage = $scope.viewby;
		$scope.maxSize = 5

		$scope.setPage = function(pageNo){
			$scope.currentPage = pageNo
		}

		$scope.pageChanged = function() {
		    console.log('Page changed to: ' + $scope.currentPage);
		  };

		  $scope.setItemsPerPage = function(num){
		  	$scope.itemsPerPage = num;
		  	$scope.currentPage = 1;
		  }
		  		

	}).filter('startFrom',function(){
   		return function(data, start){
    	return data.slice(start);
 	}
});