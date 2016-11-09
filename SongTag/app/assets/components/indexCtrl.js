var app = angular.module("SongTag")
	.controller("indexCtrl", function($scope,musicService,$window){
		$scope.sliced = function(){
			if (!$scope.songs) {
				$scope.songs = []
				$scope.export = []
			}
			return $scope.songs.slice((($scope.currentPage-1)*$scope.itemsPerPage), (($scope.currentPage)*$scope.itemsPerPage))
		}
		$scope.remove = function(event,index){
			$scope.export.splice(index, 1)
		}

		$scope.before = function(index){
			var arr = $scope.sliced()
			$scope.export.push(arr[index])
		}

		// $scope.csvSubmit = function() {
		//   var csv = $.post('http://ip_addr:3000/api/csv', { 'input': $scope.query_box });
		//   csv.done(function(result){
		//     var hiddenElement = document.createElement('a');

		//     hiddenElement.href = 'data:attachment/csv,' + encodeURI(result);
		//     hiddenElement.target = '_blank';
		//     hiddenElement.download = 'filename.csv';
		//     hiddenElement.click();
		//   })
		// }

		$scope.download = function (){
			if ($scope.export.length < 1) {
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