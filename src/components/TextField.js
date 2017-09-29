import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

const TextField = props =>
		<form onSubmit={props.submitPost}>
			<input type="text" name="title" placeholder="Entry Title..."/>
			<input type="text" name="author" placeholder="Author..."/>
			<ReactQuill 
				value={props.textField} 
				onChange={props.handleChange}/>
			<button type="submit" name="submit" value="submit">POST</button>
		</form>

TextField.propTypes = {
	textField: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	submitPost: PropTypes.func.isRequired
}

export default TextField;