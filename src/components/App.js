import React, { Component } from 'react';
import axios from 'axios';
import TextField from './TextField';
import BlogTimeline from './BlogTimeline';


class App extends Component {
	constructor(props){
		super(props)
		this.state={
			nextKey: 1,
			pendingPost: "",
			posts: []
		}
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		this.gatherPosts();
	}

	handleChange(value){
		this.setState(prevState => ({
			pendingPost: value
		}))
	}

	handleSubmitPost = (e) => {
		e.preventDefault();
		var postArray = this.state.posts.filter(post => post.title = "Untitled").length;
		if(e.target.title.value === ""){
			e.target.title.value = `Untitled ${postArray + 1}`;
		}
		axios.post('http://192.168.1.3:3100/api/posts', {
			title: e.target.title.value,
			text: this.state.pendingPost,
			author: e.target.author.value || "Anonymous"
			})
			.then(response => {
				this.gatherPosts();
			})
			.catch(error => {
        		console.log('Error posting form', error);
      		});

		return(
			e.target.title.value = '',
			e.target.author.value = '',
			this.setState(prevState => ({
				pendingPost: ''
			}))
		);
	}

	gatherPosts = () => {
		axios.get('http://192.168.1.3:3100/api/posts')
			.then(response => {
				console.log(response);
				this.setState({
					posts: response.data
				});
			})
			.catch(error => {
        		console.log('Error fetching and parsing data', error);
      		});
	}

	render() {
		return (
			<div>
				<BlogTimeline posts={this.state.posts}/>
	    		<TextField 
	    			submitPost = {this.handleSubmitPost}
		      		textField={this.state.pendingPost}
		      		handleChange={this.handleChange}
		      />
	      </div>
	   );
  	}
}

export default App;
