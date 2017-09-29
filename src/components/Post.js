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
		<div>
			<h1>{props.postTitle}</h1>
			<p>{postDate}</p>
			{ReactHtmlParser(props.postBody)}
			<p>{props.postAuthor}</p>
		</div>
		);
}

Post.propTypes = {
	postBody: PropTypes.string
}

export default Post;