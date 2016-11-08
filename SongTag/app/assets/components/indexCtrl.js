var app = angular.module("SongTag")
	.controller("indexCtrl", function($scope,musicService){
		$scope.songQuery
		$scope.tagQuery 
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

		$scope.search = function(){
			var params = {}
			if($scope.songQuery){
				params["song"] = $scope.songQuery
			}
			if ($scope.tagQuery) {
				params["tags"] = $scope.tagQuery.split(',')
			}
			if (params.tags || params.song) {
				musicService.requestSongs(params).then(function success(res){
					$scope.songs = res.data
					$scope.totalItems = $scope.songs.length
				},
				function error(res){

				})
			}

		}

		$scope.numsAndDigits_tag = function($event){
				var pattern = /[a-z]|[0-9]|\s|,/i;
				if (!pattern.test($event.key)) {
					$event.preventDefault();
					return ""
				}
		}

		$scope.numsAndDigits_song = function($event){
				var pattern = /[a-z]|[0-9]|\s/i;
				if (!pattern.test($event.key)) {
					$event.preventDefault();
					return ""
				}
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