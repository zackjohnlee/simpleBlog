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
		//setInterval(this.gatherPosts, 2000);
	}

	handleChange(value){
		console.log(value);
		this.setState(prevState => ({
			pendingPost: value
		}))
	}

	handleSubmitPost = e => {
		e.preventDefault();
		axios.post('http://localhost:3100/api/posts', {
			title: e.target.title.value,
			text: this.state.pendingPost,
			author: e.target.author.value || "Anonymous"
		})
			.then(response => {
				console.log(response)
			})
			.catch(error => {
        		console.log('Error posting form', error);
      		});

		return(
			e.target.title.value = '',
			e.target.author.value = '',
			this.setState(prevState => ({
				pendingPost: ''
			})),
			this.gatherPosts()
		);
	}

	gatherPosts = () => {
		axios.get('http://localhost:3100/api/posts')
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
