import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post'


const List = props => {

	let classname = props.name + "-container";

	let listView = props.posts.map((post) => {
		return <Post
					key={post['_id']}
					postTitle={post.title}
					postBody={post.text}
					postAuthor={post.author}
					dateCreated={post.createdAt}
					isExpanded={post.expand}
					handleExpansion={() => props.expansionHandler(post['_id'])}/>
	});
	return(
		<div className={classname}>
			{listView}
		</div>
	);
}

List.propTypes = {
	posts: PropTypes.array
}

export default List;