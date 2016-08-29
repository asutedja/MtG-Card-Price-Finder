angular.module('MtGFinder', ['MtGFinder.services'])
.controller('MtGController', function($scope,Cards) {
	$scope.cards = '';

	$scope.searchCard = function(card) {
		console.log(card);
		$scope.query = card;
		$scope.card = '';
		$scope.result = Cards.cardSearch(card);


	}
});