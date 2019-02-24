import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import Icon from '@material-ui/core/Icon';
// import DeleteIcon from '@material-ui/icons/Delete';
// import NavigationIcon from '@material-ui/icons/Navigation';

const styles = (theme) => ({
	AddButton: { position: 'fixed', bottom: '25px', left: '25px' },
	extendedIcon: {
		marginRight: theme.spacing.unit
	},

	Float: {
		position: 'fixed',
		width: '60px',
		height: '60px',
		bottom: '40px',
		right: '40px',
		backgroundColor: '#0C9',
		color: '#FFF',
		borderRadius: '50px',
		textAlign: 'center',
		boxShadow: '2px 2px 3px #999'
	}
});

function FloatingActionButtons(props) {
	const { classes } = props;
	return (
		<div>
			<Fab color="primary" aria-label="Add" className={classes.AddButton}>
				<AddIcon onClick={props.clicked} />
			</Fab>
			{/* <Fab color="secondary" aria-label="Edit" className={classes.fab}>
        <Icon>edit_icon</Icon>
      </Fab>
      <Fab variant="extended" aria-label="Delete" className={classes.fab}>
        <NavigationIcon className={classes.extendedIcon} />
        Extended
      </Fab>
      <Fab disabled aria-label="Delete" className={classes.fab}>
        <DeleteIcon />
      </Fab> */}
		</div>
	);
}

FloatingActionButtons.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
