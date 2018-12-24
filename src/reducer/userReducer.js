
const initialState = {
    type: 'player',
    firstName: 'Ilya',
    lastName: 'Radu',
    emailName: 'radu@gmail.com',
    token: null,
    refreshToken: null,
    userId: null,
    avatar: 'https://randomuser.me/api/portraits/men/97.jpg',
    mobile: '123456',
    created: {type: Date, default: Date.now},
    error: null,
    loading: false
};
  
const  userReducer =(state = initialState, action)=> {
    switch (action.type) {
        case "GET_USER":
            return state;
        case "AUTH_START":
            return {
                ...state, 
                error: null, 
                loading: true
            };
        case "AUTH_SUCCESS":
            return {
                ...state, 
                token: action.idToken,
                refreshToken: action.refreshToken,
                userId: action.userId,
                error: null, 
                loading: false
            };
        case "AUTH_FAIL":
            return {
                ...state, 
                error: action.error, 
                loading: false
            };
        default: return state
    }
};
export default userReducer;
