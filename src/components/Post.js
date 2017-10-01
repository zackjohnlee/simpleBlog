import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


const Post = props =>{

	const utcDate = new Date(props.dateCreated);

	const day = utcDate.getDate();
	const year = utcDate.getFullYear();
	const month = utcDate.getMonth() + 1;
	const postDate = `${month}/${day}/${year}`;

	let bodyDiv = ReactHtmlParser(props.postBody);
	let collapseTag

	//bodyDiv gives a list of DOM nodes, while postBody.length is the list of characters
	if(bodyDiv.length <= 2 && props.postBody.length < 500){
		collapseTag = {
			display: 'none'
		};
	}

	const styles = {
		height: props.isExpanded ? 'initial' : `75px`
	};

	return(
		<div className="post-container">
			<div className="post-header">
				<h1>{props.postTitle}</h1>
				<p>{postDate}</p>
			</div>
			<p className="author"><span className="author-tag"> created by: </span> {props.postAuthor}</p>
			<div style={styles} className="post-body">{bodyDiv}</div>

			<div className="collapse" style={collapseTag}>
				<label className="expander">
					{props.isExpanded ? 'less...' : '...more'}
					<input 
					  	id="check"
					  	type="checkbox" 
					  	checked={props.isExpanded}
					  	onChange={props.handleExpansion}/>
				</label>
		  	</div>	
			

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