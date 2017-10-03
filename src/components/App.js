import React, { Component } from 'react';
import {
   BrowserRouter,
   Route,
   Switch
} from 'react-router-dom';
import axios from 'axios';
import TextField from './TextField';
import List from './List';
import Button from './Button';


class App extends Component {
	constructor(props){
		super(props)
		this.state={
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
			author: e.target.author.value || "Anonymous",
			expand: false
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

	gatherPosts = (page = '0') => {
		axios.get(`http://192.168.1.3:3100/api/posts/${page}`)
			.then(response => {
				console.log(response);
				this.setState({
					posts: response.data,
					page: page
				});
			})
			.catch(error => {
        		console.log('Error fetching and parsing data', error);
      		});
      	axios.get("http://192.168.1.3:3100/api/")
      		.then(response => {
      			this.setState({
      				totalPosts: response.data
      			})
      		})
	}

	toggleExpansion = (id) => {
		this.setState({
      		posts: this.state.posts.map(post => {
		        if(id === post['_id']){
		          	return{
			            ...post,
			            expand: !post.expand
			        };
		        }
		        return post;
		    })
		});
	}

	pageSearch(dir) {
		if (Math.ceil(this.state.totalPosts/3)<=this.state.page+1 && dir != -1){
			return null;
		}else{
			this.gatherPosts(parseInt(this.state.page) + dir);
		}
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Route
						path="/posts/:page"
						render={() =>
							<List
								name={"timeline"}
								posts={this.state.posts}
								expansionHandler={this.toggleExpansion}
							/>
						}
					/>
					<div className="page-nav">
						<Button
							handleClick={() => this.pageSearch(-1)}
							symbol={"<"}
						/>
						<Button
							handleClick={() => this.pageSearch(1)}
							symbol={">"}
						/>
					</div>
		    		<TextField 
		    			submitPost = {this.handleSubmitPost}
			      		textField={this.state.pendingPost}
			      		handleChange={this.handleChange}
			      	/>
		    	</div>
	    	</BrowserRouter>
	   	);
  	}
}

export default App;
