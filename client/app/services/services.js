angular.module('MtGFinder.services', [])
.factory('Cards', function($http) {

	var cardSearch = function(query) {
		// console.log('I made it here', query)
		return $http({
			method: 'POST',
			url: '/search',
			query: query
		}).then(function(resp) {
			return resp.data;
		})
	}

	return {
		cardSearch: cardSearch
	}

})