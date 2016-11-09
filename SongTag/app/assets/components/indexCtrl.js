var app = angular.module("SongTag")
	.controller("indexCtrl", function($scope,musicService,$window){
		
		$scope.delete = function(result){
			musicService.deleteSong(result.song_id)
			var index = $scope.songs.indexOf(result)
			var index2 = $scope.export.indexOf(result)
			$scope.songs.splice(index,1)
			$scope.export.splice(index2,1)
		}

		$scope.sliced = function(){
			if (!$scope.songs) {
				$scope.songs = []
				$scope.export = []
			}
			var onPage = $scope.songs.slice((($scope.currentPage-1)*$scope.itemsPerPage), (($scope.currentPage)*$scope.itemsPerPage))
			
			return onPage
		}
		$scope.remove = function(event,index){
			$scope.export.splice(index, 1)
		}

		$scope.before = function(index){
			var arr = $scope.sliced()
			$scope.export.push(arr[index])
		}

		$scope.id = function(result){
			localStorage.setItem("data",angular.toJson(result))
			$window.location.href = "/edit"
		}

		$scope.download = function (){
			if ($scope.export.length < 1 || !$scope.export) {
				alert("There must be at least one song to export")
				return ""
			}

			musicService.exportCSV($scope.export).then(function success(res){
				$window.location.href = res.config.url
			},
			function fail(){

			})
			
		}


		$scope.songQuery
		$scope.tagQuery 
		$scope.songs
		if (!$scope.songs) {
			musicService.requestSongs().then(function success(res){
				$scope.songs = res.data
				$scope.export = []
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


		  $scope.drag = function($event){
		  	 
		  	$scope.draggable = !$scope.draggable
		  	if ($scope.draggable === true) {
		  		$event.target.parentElement.parentElement.style.border = "solid"
		  	}
		  	else{
		  		$event.target.parentElement.parentElement.style.border = "none"
		  	}

		  	
		  }

		  		

	}).filter('startFrom',function(){
   		return function(data, start){
    		return data.slice(start);
 			}
	    });