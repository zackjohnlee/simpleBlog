'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PostSchema = new Schema({
	title: String,
	text: String,
	author: String,
	createdAt: {type: Date, default: Date.now},
	expand: Boolean
});


var Post = mongoose.model("Post", PostSchema);

module.exports.Post = Post;