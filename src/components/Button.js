import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {

	return(
		<button
			className={props.classname}
			type="button"
			onClick={props.handleClick}>
			{props.symbol}
		</button>
	);
}

Button.propTypes = {
	handleClick: PropTypes.func
}

export default Button;