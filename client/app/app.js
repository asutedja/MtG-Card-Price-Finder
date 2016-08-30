angular.module('MtGFinder', ['MtGFinder.services'])
.controller('MtGController', function($scope,Cards) {
	$scope.cards = '';

	$scope.searchCard = function(card, set) {
		//console.log(card);
		//$scope.query = card + ' ' + set;
		$scope.card = '';
		Cards.cardSearch(card,set).then(function(data) {
			var price = data.items[0].tcg_mid;

			$scope.result = card + ' from set ' + set + ' is worth $' + price + ' according to TCG';
		});


	}
});