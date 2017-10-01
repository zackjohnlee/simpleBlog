import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


const Post = props =>{

	const utcDate = new Date(props.dateCreated);

	const day = utcDate.getDate();
	const year = utcDate.getFullYear();
	const month = utcDate.getMonth() + 1;
	const postDate = `${month}/${day}/${year}`;

	const styles = {height: props.isExpanded ? 'initial' : `100px`};
	
	return(
		<div className="post-container">
			<div className="post-header">
				<h1>{props.postTitle}</h1>
				<p>{postDate}</p>
			</div>
			<p className="author"><span className="author-tag"> created by: </span> {props.postAuthor}</p>
			<div style={styles}className="post-body">{ReactHtmlParser(props.postBody)}</div>

			<label className="expander">...more
			  <input 
			  	type="checkbox" 
			  	checked={props.isExpanded}
			  	onChange={props.handleExpansion}/>
			</label>

			<div className="post-divider"/>
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