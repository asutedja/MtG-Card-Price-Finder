angular.module('MtGFinder', ['MtGFinder.services'])
.controller('MtGController', function($scope,Cards) {
	$scope.cards = '';

	$scope.searchCard = function(card) {
		//console.log(card);
		//$scope.query = card;
		$scope.card = '';
		Cards.cardSearch(card).then(function(data) {
			$scope.result = data;
		});


	}
});