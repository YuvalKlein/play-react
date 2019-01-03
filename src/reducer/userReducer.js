
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
    loading: false,
    alreadyUser: false,
    authError: null

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
                email:action.email,
                password:action.password,
                error: null, 
                loading: false
            };
        case "AUTH_FAIL":
            return {
                ...state, 
                error: action.error, 
                loading: false
            };
        case "AUTH_LOGOUT":
            return {
               ...state,
               token: null,
               refreshToken: null,
               usetId: null 
            }
        case 'LOGIN_ERROR':
            console.log(action.err.message);
            return {
              ...state,
              authError: action.err.message
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
              authError: null
            }
        case 'SIGNUP_ERROR':
            console.log(action.err.message);
            return {
              ...state,
              authError: action.err.message
            }
        case 'SIGNUP_SUCCESS':
            console.log('login success');
            return {
              authError: null
            }
        case 'SIGN_OUT':
        console.log('signout success');
        return state;
        default: return state
    }
};
export default userReducer;
