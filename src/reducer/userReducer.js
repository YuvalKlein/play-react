
const initialState = {
    type: 'player',
    firstName: 'Ilya',
    lastName: 'Radu',
    emailName: 'radu@gmail.com',
    password: 'XXXX',
    avatar: 'https://randomuser.me/api/portraits/men/97.jpg',
    mobile: '123456',
    created: {type: Date, default: Date.now}
};
  
const  userReducer =(state = initialState, action)=> {
    switch (action.type) {
        case "GET_USER":
            return state
        default: return state
    }
};
export default userReducer;
