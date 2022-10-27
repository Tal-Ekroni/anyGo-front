import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
}

window.userService = userService


async function getUsers() {
    const users = await httpService.get(`user`)
    return users

}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    gWatchedUser = user;
    return user;
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    // Handle case in which admin updates other user's details
    const updatedUser = await httpService.put(`user/${user._id}`, user)
    if (getLoggedinUser()._id === user._id) _saveLocalUser(updatedUser)
    return updatedUser;
}

async function login(userCred) {
    // const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)

    const user = await httpService.post('auth/login', userCred)
    // socketService.emit('set-user-socket', user._id);
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    userCred.isHost = false;
    userCred.imgUrl = '';
    userCred.myStays = [];
    userCred.notifications = [];
    userCred.mySaves = []
    const user = await httpService.post('auth/signup', userCred)
    // socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
    // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the watched user (comming from other browsers)
    window.addEventListener('storage', async () => {
        if (!gWatchedUser) return;
        const freshUsers = await storageService.query('user')
        const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
        if (!watchedUser) return;
        //     socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
        // }
        gWatchedUser = watchedUser
    })
})();

// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();

