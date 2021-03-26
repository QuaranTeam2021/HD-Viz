import PropTypes from 'prop-types';

function Message({ msg }) {
	return (
		<div className="uploadState">
			{msg}
		</div>
	)
};

Message.propTypes = {
	msg: PropTypes.string.isRequired,
};

export default Message;

