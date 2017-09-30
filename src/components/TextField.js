import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';


const TextField = props => {
	
	const modules = {
    	toolbar: [
      		['bold', 'italic', 'underline','strike', 'blockquote'],
      		[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      		['link', 'image'],
      		['clean']
    	]
  	};

  	const formats = [
    	'header',
    	'bold', 'italic', 'underline', 'strike', 'blockquote',
    	'list', 'bullet', 'indent',
    	'link', 'image'
  	];

	return(
		<div className="post-form">
			<form onSubmit={props.submitPost}>
				<input type="text" name="title" placeholder="Entry Title..."/>
				<input type="text" name="author" placeholder="Author..."/>
				<ReactQuill 
					value={props.textField} 
					onChange={props.handleChange}
					modules={modules}
					formats={formats}
					theme="snow"
					placeholder="Start your story...">
					<div className="text-area"></div>
				</ReactQuill>
				<button type="submit" name="submit" value="submit">POST</button>
			</form>
		</div>
	);
};

TextField.propTypes = {
	textField: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	submitPost: PropTypes.func.isRequired
}

export default TextField;