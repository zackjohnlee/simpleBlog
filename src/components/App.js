import React, { Component } from 'react';
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
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(value){
		this.setState(prevState => ({
			pendingPost: value
		}))
	}

	handleNewPost = e =>{
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

	render() {
		return (
			<div>
				<BlogTimeline posts={this.state.posts}/>
	    		<TextField 
	    			newPost = {this.handleNewPost}
		      		textField={this.state.pendingPost}
		      		handleChange={this.handleChange}
		      />
	      </div>
	   );
  	}
}

export default App;
