import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post'


const BlogTimeline = props => {
	let classname = props.name + "-container";
	let postTimeline = props.posts.map((post) => {
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
			{postTimeline}
		</div>
	);
}

BlogTimeline.propTypes = {
	posts: PropTypes.array
}

export default BlogTimeline;