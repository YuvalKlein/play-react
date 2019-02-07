import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Map from '../../Map/Map';
import classes from './SessionInfo.css';
import Avatar from '../../UI/Avatar/avatat';

const SessionInfo = (props) => {
	let session = props.session;
	if (props.openInfo) {
		return (
			<div>
				<Modal isOpen={props.openInfo} toggle={() => props.toggle()}>
					<ModalHeader toggle={() => props.toggle()}>{session.title}</ModalHeader>
					<ModalBody className={classes.SessionInfo}>
						<p>
							{session.date} from {session.time} until {session.endTime} at {session.location}
						</p>
						{/* <div className={classes.Map}>
							<Map />
						</div> */}
						<p>Details: {session.details}</p>
						<p>Players:</p>
						<div className={classes.Players}>
							{session.players.map((player, i) => (
								<div key={i}>
									<Avatar name={player.firstName} avatar={player.photoURL} />
								</div>
							))}
						</div>
						<div>
							Craeted By:{' '}
							<Avatar name={session.createdBy.firstName} avatar={session.createdBy.photoURL} />
						</div>
					</ModalBody>
					<ModalFooter>{props.btnBook}</ModalFooter>
				</Modal>
			</div>
		);
	} else return null;
};

export default SessionInfo;
