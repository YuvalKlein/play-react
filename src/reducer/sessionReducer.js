const initialState = {
	sessionList: [],
	session: {},
	sessionID: null,
	sessionTitle: null,
	inClass: false,
	shareDialogOpen: false,
	signOutDialogOpen: false,
	toggleEdit: false
};

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_NEW_SESSION':
			console.log('ADD_NEW_SESSION', action.payload);
			return {
				...state,
				shareDialogOpen: !state.shareDialogOpen,
				sessionID: action.payload.id,
				sessionTitle: action.payload.sessionTitle
			};
		case 'ADD_NEW_SESSION_ERROR':
			return { ...state, err: action.err };
		case 'UPDATE_PLAYERS_IN_SESSION':
			return state;
		case 'REMOVE_PLAYER_FROM_SESSION':
			return { ...state, session: action.session };
		case 'EDIT_SESSION':
			return { ...state, session: action.session };
		case 'DELETE':
			return state;
		case 'SHARE_DIALOG_OPEN':
			return {
				...state,
				shareDialogOpen: !state.shareDialogOpen,
				session: action.payload,
				sessionTitle: action.payload.title,
				sessionID: action.payload.id
			};
		case 'SIGN_OUT_DIALOG_OPEN':
			return { ...state, signOutDialogOpen: !state.signOutDialogOpen, session: action.payload };
		case 'BOOKED':
			return { ...state, inClass: !state.inClass };
		case 'TOGGLE_EDIT':
			return { ...state, toggleEdit: !state.toggleEdit, session: action.payload };
		default:
			return state;
	}
};
export default sessionReducer;
