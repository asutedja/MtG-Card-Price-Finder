var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//Remember to always kill all databases before trying to turn
//one on.
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// app.all('/*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
//     next();
// });

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
	console.log('THIS IS THE REQUEST DATA', req)

	var manyCards = function(db, callback) {
		var collection = db.collection('cards');
		collection.insertOne({query: req.body.data}, function(err,result) {
			collection.find({}).toArray(function(err,cards) {
				callback(cards);
			})
		}) 
	}
  MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");
	manyCards(db,function(data) {
		console.log('Here I am', data);
		res.status(201).send(data);
	})
});





});


app.listen(3000);
console.log('Listening to port 3000');