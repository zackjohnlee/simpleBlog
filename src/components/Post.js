import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


const Post = props =>

	<div>
		{ReactHtmlParser(props.postBody)}
	</div>

Post.propTypes = {
	postBody: PropTypes.string
}

export default Post;