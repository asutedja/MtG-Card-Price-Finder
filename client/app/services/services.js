angular.module('MtGFinder.services', [])
.factory('Cards', function($http) {

	var cardSearch = function(query, set) {
		// console.log('I made it here', query)
		var data = {
			name: query,
			set: set
		};
		// return $http.get('http://127.0.0.1:3000/')
		// 	.then(function(data) {
		// 		console.log('I did it', data);
		// 	})
		return $http.post('/search', data)
		.then(function(resp) {
			return resp.data;
		})
	}

	return {
		cardSearch: cardSearch
	}

})