angular.module('finder', [])
.controller('MtGController', function($scope) {
	$scope.cards = 'working'

	$scope.searchCard = function(card) {
		console.log(card);
		$scope.cards = card;
	}
});