import React from 'react';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

const shareButton = (props) => {
	return (
		<div onClick={() => props.clicked(props.session)}>
			<WhatsappShareButton title={props.name} url={props.urll}>
				<WhatsappIcon round={true} />
			</WhatsappShareButton>
		</div>
	);
};

export default shareButton;
