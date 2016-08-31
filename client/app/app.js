angular.module('MtGFinder', ['MtGFinder.services'])
.controller('MtGController', function($scope,Cards) {
	$scope.cards = '';

	$scope.result = [];
	$scope.searchCard = function(card) {
		$scope.card = '';

		Cards.cardSearch(card).then(function(data) {
			var price = data.items[0].tcg_mid;
			var low = data.items[0].tcg_low;
			var foil = data.items[0].foil_price
			var item = {};
			var message = 'According to TCG, ' + card + ' is $' + low + ' at TCG low and $' + price + ' at TCG mid.'
			if (foil !== null) {
				message.concat('The foil price is $' + foil + '.')
			}
			item['url'] = data.items[0].purchase_link;
			item['message'] = message
			item['image'] = data.items[0].image;

			$scope.result.push(item); 
		});


	}
});