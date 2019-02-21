import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { format } from 'date-fns';

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
						<div className={classes.Modal}>
							<h3>
								{format(session.date, 'iiii')} {format(session.date, 'dd/MM/yyyy')}
							</h3>
							<h4>
								{session.time} - {session.endTime}
							</h4>
							{/* <div className={classes.Map}>
							<Map />
						</div> */}
							<h5>Details: </h5>
							<p>{session.details}</p>
							<h5>Players:</h5>
							<div className={classes.Players}>
								{session.players.map((player, i) => (
									<div key={i}>
										<Avatar name={player.firstName} avatar={player.photoURL} />
									</div>
								))}
							</div>
							<div>
								<h6>Craeted By: </h6>
								<Avatar name={session.createdBy.firstName} avatar={session.createdBy.photoURL} />
							</div>
						</div>
					</ModalBody>
					<ModalFooter className={classes.Footer}>
						<ShareButton
							urll={'https:/playsport.co.il/' + session.id}
							name={' invite you to play ' + session.title}
							session={session}
							clicked={() => {}}
							size={35}
							stylee={{ marginRight: '200px' }}
						/>
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
