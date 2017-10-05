import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from './Button';

const TextField = props => {
	
	const modules = {
    	toolbar: [
    		[{'font': [] }],
    		[{ 'size': ['small', false, 'large'] }],
      		['bold', 'italic', 'underline','strike'],
      		['code', 'blockquote'],
      		[{'background': []}, {'color': [] }],
      		[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      		[{'align': [] }, 'code-block'],
      		['link'],
      		['clean']
    	]
  	};

  	const formats = [
    	'header',
    	'font', 'size',
    	'bold', 'italic', 'underline', 'strike', 'blockquote',
    	'code', 'blockquote',
    	'background', 'color',
    	'list', 'bullet', 'indent',
    	'align', 'direction', 'code-block',
    	'link'
  	];

	return(
		<div className="post-form">
			<Button 
				classname="text-toggle"
				symbol={props.isOpen ? "x" : "+"}
				handleClick={props.handleTextToggle} />
			{props.isOpen &&
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
			}
		</div>
	);
};

TextField.propTypes = {
	textField: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	submitPost: PropTypes.func.isRequired
}

export default TextField;