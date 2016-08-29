var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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
	res.send(req.body.data);

});


app.listen(3000);
console.log('Listening to port 3000');