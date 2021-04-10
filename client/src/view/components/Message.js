import PropTypes from 'prop-types';
import React from 'react';

function Message({ msg }) {
	return (
		<div className="uploadState">
			{msg}
		</div>
	)
}

Message.propTypes = {
	msg: PropTypes.string.isRequired,
};

export default Message;

