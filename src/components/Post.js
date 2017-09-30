import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


const Post = props =>{

	const utcDate = new Date(props.dateCreated);

	const day = utcDate.getDate();
	const year = utcDate.getFullYear();
	const month = utcDate.getMonth() + 1;
	const postDate = `${month}/${day}/${year}`;

	return(
		<div className="post-container">
			<h1>{props.postTitle}</h1>
			<p>{postDate}</p>
			<div className="post-body">{ReactHtmlParser(props.postBody)}</div>
			<p>{props.postAuthor}</p>
		</div>
		);
}

Post.propTypes = {
	postTitle: PropTypes.string,
	postBody: PropTypes.string,
	postAuthor: PropTypes.string,
	dateCreated: PropTypes.string
}

export default Post;