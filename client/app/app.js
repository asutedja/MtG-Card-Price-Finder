angular.module('MtGFinder', ['MtGFinder.services'])
.controller('MtGController', function($scope,Cards) {
	$scope.cards = '';

	$scope.result = [];
	$scope.searchCard = function(card) {
		//$scope.card = '';

		Cards.cardSearch(card).then(function(data) {
			var price = data.items[0].tcg_mid;
			var item = {};
			item['message'] = card + ' is worth $' + price + ' according to TCG';
			item['image'] = data.items[0].image;

			$scope.result.push(item); 
		});


	}
});