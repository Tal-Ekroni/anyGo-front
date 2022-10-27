import { userService } from "../services/user.service.js";
import { utilService } from "../services/util.service.js";
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";


export function loadUsers() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {

        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}
export function loadUser(userId) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const user = await userService.getById(userId)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {

        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {

        }
    }
}
export function updateUser(userToSave) {
    return async (dispatch) => {
        try {
            const updatedUser = await userService.update(userToSave)
            dispatch({
                type: 'UPDATE_USER',
                user: updatedUser
            })
        } catch (err) {
        }
    }
}



export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
        }
    }
}


export function onSignup(credentials) {
    return (dispatch) => {
        userService.signup(credentials)
            .then(user => {
                dispatch({
                    type: 'SET_USER',
                    user
                })
            })
            .catch(err => {
            })

    }
}

export function onLogout() {
    return (dispatch) => {
        userService.logout()
            .then(() => dispatch({
                type: 'SET_USER',
                user: null
            }))
            .catch(err => {
            })
    }
}
export function onBecomeHost(userId) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.getById(userId)
            user.isHost = true
            const updatedUser = await userService.update(user)
            dispatch({
                type: 'UPDATE_USER', user: updatedUser
            })
        } catch (err) {

        }
    }
}

export function onToggleLikedStay(savedStayId, isLiked, userId) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.getById(userId)
            console.log('ido user check ', user , savedStayId , isLiked );
            if (isLiked) {
                user.mySaves.push(savedStayId)
            } else {
                user.mySaves = user.mySaves.filter(saved => saved !== savedStayId)
            }
            const savedUser = await userService.update(user)
            dispatch({ type: 'UPDATE_USER', savedUser })
        } catch (err) {
        }
    }
}

export function onBookTrip(trip) {
    return async (dispatch, getState) => {
        try {
            const user = await userService.getById(trip.user._id)
            const hostUser = await userService.getById(trip.stay.host._id)
            const orderId = utilService.makeId()

            const userTrip = trip
            userTrip.id = orderId
            const hostOrder = trip
            hostOrder.id = orderId

            if (!hostUser.orders) hostUser.orders = []
            if (!user.myTrips) user.myTrips = []
            hostUser.orders.push(hostOrder)
            user.myTrips.push(userTrip)

            const updatedUser = await userService.update(user)
            const updatedHost = await userService.update(hostUser)
            dispatch({ type: 'UPDATE_USER', user: updatedUser })
            dispatch({ type: 'UPDATE_USER', user: updatedHost })
        } catch (err) {

        }
    }
}

export function loadAndWatchUser(userId) {
    return async (dispatch) => {
        try {
            // const user = await userService.getById(userId);
            // dispatch({ type: 'SET_WATCHED_USER', user })
            // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
            // socketService.off(SOCKET_EVENT_USER_UPDATED)
            // socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
            //     dispatch({ type: 'SET_WATCHED_USER', user })
            // })
        } catch (err) {
        }
    }
}

