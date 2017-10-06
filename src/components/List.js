import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TransitionGroupPlus from 'react-transition-group-plus';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import Post from './Post';

let pageTurn = "";


class List extends Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentPage > this.props.currentPage){
			pageTurn = "page-slide-right"
		} else{
			pageTurn = "page-slide-left"
		}
	}

	render(){
		let classname = this.props.name + "-container";

		let listView = this.props.posts.map((post) => {
			return <Post
						key={post['_id']}
						postTitle={post.title}
						postBody={post.text}
						postAuthor={post.author}
						dateCreated={post.createdAt}
						isExpanded={post.expand}
						handleExpansion={() => this.props.expansionHandler(post['_id'])}/>
		});
		return(
			<div className={classname}>
					<ReactCSSTransitionGroup
						transitionName={pageTurn}
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
						
		          		>
						{listView}
					</ReactCSSTransitionGroup>
			</div>
		);
	}
}

List.propTypes = {
	posts: PropTypes.array
}

export default List;