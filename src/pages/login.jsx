import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { LoginSignup } from '../cmps/login-signup'
import { socketService } from '../services/socket.service'
import { userService } from '../services/user.service'
import { onLogin, onLogout, onSignup, updateUser, loadUser } from '../store/user.actions'
class _LoginPage extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
            email: '',
            fullname: ''
        },
        isSignUp: false,
        users: []
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        const users = await userService.getUsers()
        this.setState({ users })
    }

    clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                email: '',
                fullname: ''
            },
            isSignUp: false
        }
        this.setState({ clearTemplate })
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ credentials: { ...this.state.credentials, [field]: value } });
    }
    onLogin = async (ev = null) => {
        if (ev) ev.preventDefault();
        if (!this.state.credentials.username) return;
        await this.props.onLogin(this.state.credentials);
        await this.props.loadUser(this.props.user._id)
        const { user } = this.props
        if (user.isHost) {
            socketService.setup()
            socketService.emit('setHost', user._id)
            socketService.on('getNotif', async (notif) => {
                const editedNotif = {
                    notifTxt: `${notif.txt} at ${notif.stay.name}`,
                    byUser: notif.byUser.fullName,
                    byUserImg: `https://i.pravatar.cc/100?u=${notif.byUser._id.substr(notif.byUser._id.length - 8)}`,
                    isRead: notif.isRead,
                    createdAt: notif.createdAt,
                }
                user.notifications = [editedNotif, ...user.notifications]
                await this.props.updateUser(user)
            })
        }
        this.clearState()
        this.props.history.goBack()
    }
    onSignup = async (ev = null) => {
        if (ev) ev.preventDefault();
        if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
        await this.props.onSignup(this.state.credentials);
        this.clearState()
        this.props.history.push('/')
    }
    toggleSignUp = (ev) => {
        ev.preventDefault()
        this.setState({ isSignUp: !this.state.isSignUp })
    }
    render() {
        const { username, password, fullname, email } = this.state.credentials;
        const { isSignUp, users } = this.state;
        if (!users) return <div>loading...</div>
        return (
            <section className="items-center main-container page-padding">
                <form className="login flex column justify-center align-center">
                    <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
                    <h2>{isSignUp ? 'Welcome to AnyGo' : 'Welcome back'}</h2>
                    <div className="input-fields flex column align-center">
                        {isSignUp && <div className='fullname-input'>
                            <input className='flex' type="text" name="fullname" placeholder="fullname" value={fullname} onChange={this.handleChange} required />
                        </div>}
                        <div className={isSignUp ? 'login-input border-top' : 'login-input'}>
                            <input className='flex' type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} required />
                        </div>
                        {isSignUp && <div className='fullname-input'>
                            <input className='flex' type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} required />
                        </div>}
                        <div className='password-input'>
                            <input className='flex' type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
                        </div>
                    </div>
                    <button className="login-btn" onClick={isSignUp ? this.onSignup : this.onLogin}>{isSignUp ? 'Sign Up' : 'Login'}</button>
                    <div className="new-user">
                        <button className="new-user-btn" onClick={this.toggleSignUp}>{isSignUp ? 'Already have an account ?' : 'New user ?'}</button>
                    </div>
                </form>
            </section>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    onLogin,
    onLogout,
    onSignup,
    updateUser,
    loadUser
}

export const LoginPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_LoginPage))
