import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Map from '../../Map/Map';
import classes from './SessionInfo.css';
import Avatar from '../../UI/Avatar/avatat';
import ShareButton from '../../UI/shareButton/shareButton';

const SessionInfo = (props) => {
	let session = props.session;
	let editButton = null;

	if (session) {
		if (session.createdBy.uid === props.userID) {
			editButton = (
				<button className={classes.EditButton} onClick={() => props.toggle('toggleEdit')}>
					EDIT
				</button>
			);
		}
	}

	if (props.openInfo) {
		return (
			<div>
				<Modal isOpen={props.openInfo} toggle={() => props.toggle('toggleInfo')}>
					<ModalHeader toggle={() => props.toggle('toggleInfo')}>{session.title}</ModalHeader>
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
						<ShareButton
							urll={'https:/playsport.co.il/' + session.id}
							name={' invite you to play ' + session.title}
							session={session}
							clicked={() => {}}
						/>
					</ModalBody>
					<ModalFooter>
						{editButton}
						{/* {editButton} */}
						{props.btnBook}
					</ModalFooter>
				</Modal>
			</div>
		);
	} else return null;
};

export default SessionInfo;
