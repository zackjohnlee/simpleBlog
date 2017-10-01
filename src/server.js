'use strict';

var express = require('express');
var jsonParser = require('body-parser').json;
var logger =  require('morgan');
var app = express();
//var routes = require('./routes');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require("./models/post").Post;


var port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log('Express Server listening on port: ', port)
});

//database setup------------------------------------------

app.use(logger('dev'));
app.use(jsonParser());

mongoose.connect("mongodb://localhost:27017/blogposts");
var db = mongoose.connection;

db.on("error", function(err){
	console.log("connection error:", err);
});

db.once("open", function(){
	console.log("connection succesful");
});

//CORS Middleware------------------------------------------

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if (req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
		return res.status(200).json({});
	}
	next();
});

//routes---------------------------------------------------

router.param("blogID", function(req, res, next, id){
	Post.findById(id, function(err, doc){
		if(err) return next(err);
		if(!doc) {
			var err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.post = doc;
		return next();
	});
});

router.get('/', function(req, res) {
	res.json({ message: 'API Initialized!'});
});

//GET array of posts from database
router.get('/posts', function(req, res, next){
	Post.find({})
		.sort({createdAt: -1})
		.exec(function(err, posts){
			if (err){
				return next(err);
			}
			res.json(posts);
		});
});

//POST a blog bost to database
router.post('/posts',function(req, res){
	var post = new Post();
	post.title = req.body.title;
	post.text = req.body.text;
	post.author = req.body.author;
	post.expand = false;
	post.save(function(err){
		if (err) res.send(err);
		res.json(post);
	});
});

//DELETE a blog post
router.delete('/posts/:blogID', function(req, res){
	req.post.remove(function(err){
		if(err) return next(err);
		res.json({message: 'post deleted'});
	});
});

//allow app to use routes via /api
app.use('/api', router);

//Error Catching-------------------------------------------
//404 catcher
app.use(function(req, res, next){
	var err = new Error("404 not found");
	err.status = 404;
	next(err);
});

//Error Handler
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

