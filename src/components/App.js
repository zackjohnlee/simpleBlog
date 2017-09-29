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
		console.log(value);
		this.setState(prevState => ({
			pendingPost: value
		}))
	}

	handleSubmitPost = e =>{
		e.preventDefault();
		return(
			this.setState(prevState => ({
				posts: [
					{
						body: this.state.pendingPost,
						id: this.state.nextKey
					},
					...prevState.posts
				],
				pendingPost: '',
				nextKey: this.state.nextKey + 1
			}))
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
