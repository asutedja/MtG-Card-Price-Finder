var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');
var request = require('request');
//Remember to always kill all databases before trying to turn
//one on.
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// app.all('/*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
//     next();
// });

var cardSchema = mongoose.Schema({
	mid: { type: Number, unique:true},
	name: String,
	edition: String
});

var Card = mongoose.model('Card', cardSchema);

var timeout = function(i,time) {
	setTimeout(function() {
	  request('https://api.deckbrew.com/mtg/cards?page=' + i ,function(err,res,body) {
	  	console.log(body);
	  });		
	}, time);
}

for(var i = 1, time = 0; i<165; i++, time+=50) {
	timeout(i, time);
} 

var serverGet = function(url, callback) {
	https.get(url, function(key) {
		var token = [];
		key.on('data', function(chunk) {
			token.push(chunk); 
		})
		key.on('end', function(chunk) {
			token = Buffer.concat(token).toString();
			callback(JSON.parse(token));
		})
	})
};



  	
 // MongoClient.connect(url, function(err, db) {
 //  console.log("Connected successfully to server");
 // })


//app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));


app.get('/', function(req,res) {
	res.send('I am getting this request')
});

app.post('/search', function(req,res) {
	//console.log('THIS IS THE REQUEST DATA', req)
	 
	
	serverGet('https://www.echomtg.com/api/user/auth/?email=andrew.sutedja@gmail.com&password=tropius7', function(api) {
		var token = api.token;
		console.log('api token:', token);
		serverGet('https://api.deckbrew.com/mtg/cards?name=' + req.body.name + '&set=' + req.body.set, function(data) {
			//console.log(data);
			serverGet('https://www.echomtg.com/api/inventory/add/mid=' + data[0].editions[0].multiverse_id + '&auth=' + token, function() {
				serverGet("https://www.echomtg.com/api/inventory/view/start=0&limit=100&search=" + data[0].name + '&set_code=' + data[0].editions[0].set_id + '&auth=' + token,
				function(result) {
					console.log(result);
					serverGet('https://www.echomtg.com/api/inventory/remove/inventory_id=' + result.items[0].inventory_id + '&auth=' + token, function() {
						res.status(201).send(result);						
					})
				})
			})


		});
	})




});
	// https.get('https://www.echomtg.com/api/user/auth/?email=andrew.sutedja@gmail.com&password=tropius7', function(key) {
	// 	var token = [];
	// 	key.on('data', function(chunk) {
	// 		token.push(chunk); 
	// 	})
	// 	key.on('end', function(chunk) {
	// 		key = Buffer.concat(key).toString();
	// 	})
		// var body = [];
		// https.get('https://api.deckbrew.com/mtg/cards?name=' + req.body.name + '&set=' + req.body.set,
		// function(dat) { 
		// 	dat.on('data', function(chunk) {
		// 		body.push(chunk);
		// 	})
		// 	dat.on('end', function() {
		// 		body = Buffer.concat(body).toString();
		// 		var d = JSON.parse(body);
		// 		Card.create({
		// 			mid: d[0].editions[0].multiverse_id,
		// 			name: d[0].name,
		// 			edition:d[0].editions[0].set_id
		// 		}, function() {
		// 			res.status(201).send(body);
		// 		})
		// 	})
//		})
	// })



				// var manyCards = function(db, callback) {
				// 	var collection = db.collection('cards');
				// 	collection.insertOne({query: req.body.name, mid:d[0].editions.multiverse_id, set: d[0].editions.set_id}, function(err,result) {
				// 		collection.find({}).toArray(function(err,cards) {
				// 			callback(cards);
				// 		})
				// 	}) 
				// 	 MongoClient.connect(url, function(err, db) {
				// 	   console.log("Connected successfully to server");
				// 		manyCards(db,function(data) {
				// 			console.log('Here I am', data);
				// 			res.status(201).send(data);
				// 		})
				// 	});
				// }




app.listen(3000);
console.log('Listening to port 3000');