angular.module("SongTag")
	.factory("musicService", function($http){
		var musicService = {
			requestSongs : function(params){
				return $http({
					method: "GET",
					url: "/song",
					params: params,
					paramSerializer: '$httpParamSerializerJQLike',
					responseType: "json",
					headers: {
						"Content-Type": "json",
						"accept" : "application/json"
					}
				}).then(function(response){
					return response;
				},
				function(error){
					return error;
				})
			},
			checkSong : function(params){
				return $http({
					method: "GET",
				url: "song/new",
				params: params,
				paramSerializer: "$httpParamSerializerJQLike",
				responseType: "json",
				headers: {
						"Content-Type": "json",
						"accept" : "application/json"
					}
				}).then(function(response){
					return response;
				},
				function(error){
					return error;
				})
			},
			createSong : function(data){
				return $http({
					method: "POST",
					url: "song",
					data: data,
					responseType: "json",
					headers: {
							"Content-Type": "json",
							"accept" : "application/json"
						}
					}).then(function(response){
						return response;
					},
					function(error){
						return error;
					})
			}

		}

		return musicService;
	})