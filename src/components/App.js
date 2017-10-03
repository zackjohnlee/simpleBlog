import React, { Component } from 'react';
import {
   BrowserRouter,
   Route,
   Redirect,
   Switch
} from 'react-router-dom';
import axios from 'axios';
import TextField from './TextField';
import List from './List';
import Button from './Button';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

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
		let page = parseInt(history.location.pathname.slice(1), 10);
		this.gatherPosts(page);
		
	}

	handleChange(value){
		this.setState(prevState => ({
			pendingPost: value
		}))
	}

	handleSubmitPost = (e) => {
		e.preventDefault();
		var untitledVal = this.state.posts.filter(post => post.title = "Untitled").length;
		if(e.target.title.value === ""){
			e.target.title.value = `Untitled ${untitledVal + 1}`;
		}
		axios.post('http://localhost:3100/api/posts', {
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
		axios.get(`http://localhost:3100/api/posts/${page}`)
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
      	axios.get("http://localhost:3100/api/")
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
		if (Math.ceil(this.state.totalPosts/3)<=this.state.page+1 && dir !== -1){
			return null;
		}else if (this.state.page === 0 && dir === -1){
			return null;
		}else{
			let postUrl = parseInt(this.state.page + dir, 10)
			this.gatherPosts(postUrl);
			history.push(`/${postUrl}`);
		}
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path="/" render={() => <Redirect to="/0"/>}/>
					<Route
						path="/:page"
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
