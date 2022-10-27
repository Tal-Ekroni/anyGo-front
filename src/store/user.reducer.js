import { userService } from '../services/user.service.js'


const initialState = {
    count: 10,
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}
export function userReducer(state = initialState, action) {
    var newState = state;
    var users
    switch (action.type) {
      
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'SET_WATCHED_USER':
            newState = { ...state, watchedUser: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        case 'UPDATE_USER':
            users = state.users.map(user => (user._id === action.user._id) ? action.user : user)
            newState = { ...state, users,user:action.user }
            break
        default:
    }
    // For debug:
    // window.userState = newState;

    return newState;

}
