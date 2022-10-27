import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FaAirbnb, FaBars, FaUserAlt } from 'react-icons/fa'
import { onLogin, onLogout, onSignup, loadUsers, removeUser, } from '../store/user.actions.js'
import { setFilter, setMiniHeader, loadStays } from '../store/stay.actions';
import { SearchBar } from './search-bar';
import { UserMenu } from './user-menu';
class _AppHeader extends React.Component {
    state = {
        isUserMenuOpen: false,
        isLoginBotmodal: false,
        isScreenOpen: false,
        guestModal: false,
        datesModal: false,
        locModal: false,
        isMiniInput: false,
        isNotifRead: false

    }
    componentDidMount() {
        window.scrollTo(0, 0)
        window.addEventListener('scroll', this.onScrollCloseModals)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isMiniHeader !== this.props.isMiniHeader && !this.props.isMiniHeader) {
            this.closeAllModals()
        }

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollCloseModals)
    }

    onScrollCloseModals = (ev) => {
        if (ev.target.scrollingElement.scrollTop > 1) {
            this.closeAllModals()
            this.setState({ isMiniInput: false })
        }
    }
    onOpenBotLogin = () => {
        this.setState({ isLoginBotmodal: true })
    }
    onToggleScreen = (val) => {
        this.setState({ isScreenOpen: val })
    }
    onToggleSearchModals = (modal) => {
        this.closeAllModals()
        switch (modal) {
            case 'locModal':
                this.onToggleScreen(!this.state.locModal)
                this.setState({ locModal: !this.state.locModal })
                break;
            case 'guestModal':
                this.onToggleScreen(!this.state.guestModal)
                this.setState({ guestModal: !this.state.guestModal })
                break;
            case 'datesModal':
                this.onToggleScreen(!this.state.datesModal)
                this.setState({ datesModal: !this.state.datesModal })
                break;
            case 'menuModal':
                this.onToggleScreen(!this.state.isUserMenuOpen)
                this.setState({ isUserMenuOpen: !this.state.isUserMenuOpen })
                break;
            default:
                break;

        }
    }

    closeAllModals = () => {
        this.onToggleScreen(false)
        this.setState({ locModal: false, guestModal: false, datesModal: false, isUserMenuOpen: false })
    }

    onToggleMiniSearchBar = () => {
        this.setState({ isMiniInput: !this.state.isMiniInput })
    }
    
    render() {
        const { user, setFilter, filterBy, isMiniHeader } = this.props
        const { isUserMenuOpen, isLoginBotmodal, isScreenOpen, locModal, datesModal, guestModal, isMiniInput } = this.state
        console.log('header userrrrr' ,  user);
        return (
            <header className={isMiniInput ? `app-header-conatiner main-container mini-header-with-input` : isMiniHeader ? `app-header-conatiner main-container mini-header full` : `app-header-conatiner main-container `}>
                <div className={isScreenOpen ? "screen screen-open full" : "screen full"} onClick={() => { this.closeAllModals() }}></div>
                <nav className="user-header-section flex space-between align-center">
                    <div className="logo-container flex align-center">
                        <NavLink to="/" className="logo"><FaAirbnb size={40} color={!isMiniHeader ? '#fff' : '#ff5a5f'} /><span>AnyGo</span></NavLink>
                    </div>
                    <div className="search-bar">
                        {isMiniHeader && <SearchBar loadStays={this.props.loadStays} closeAllModals={this.closeAllModals} setFilter={setFilter} isMiniHeader={isMiniHeader} filterBy={filterBy} datesModal={datesModal} guestModal={guestModal} locModal={locModal} onToggleSearchModals={this.onToggleSearchModals} onToggleMiniSearchBar={this.onToggleMiniSearchBar} />}
                    </div>
                    <div className="nav-bar-container flex ">
                        <div className="flex align-center">
                            <NavLink to="/explore/" className="nav-opt">Explore</NavLink>
                        </div>
                        <div className="nav-options flex align-center">
                            {user && user.isHost ? <NavLink to="/host" className="nav-opt">Switch to hosting</NavLink> : <NavLink to="/become-a-host" className="nav-opt">Become a host</NavLink>}
                        </div>
                        <div className="user-img-container " onClick={() => { this.onToggleSearchModals('menuModal') }}>
                            <button className="user-btn flex align-center btn-section  ">
                                <FaBars className="menu-btn" />
                                {!user?.imgUrl ? <div className="user-logo-container">
                                <div className=" user-icon flex align-center justify-center">
                                    <FaUserAlt  />
                                    </div>
                                </div> : <div className="user-logo-container">
                                    <img src={user.imgUrl} alt="" />
                                </div>}
                            </button>
                            {(user?.notifications?.length && user.notifications.some(notif => !notif.isRead)) ? <div className="notif-icon-container">
                                <div className="notif-icon flex align-center justify-center">{user.notifications.filter(notif => !notif.isRead).length}</div>
                            </div> : ''}
                        </div>
                        <div className="user-menu">
                            {isUserMenuOpen && <UserMenu onCheckRead={this.onCheckRead} onToggleSearchModals={this.onToggleSearchModals} onOpenBotLogin={this.onOpenBotLogin} />}
                        </div>
                    </div>
                </nav>
                {!isMiniHeader && <SearchBar loadStays={this.props.loadStays} closeAllModals={this.closeAllModals} setFilter={setFilter} isMiniHeader={isMiniHeader} filterBy={filterBy} datesModal={datesModal} guestModal={guestModal} locModal={locModal} onToggleSearchModals={this.onToggleSearchModals} />}
            </header>
        )
    }
}


function mapStateToProps(state) {
    return {
        users: state.userModule.users,
        user: state.userModule.user,
        count: state.userModule.count,
        isLoading: state.systemModule.isLoading,
        filterBy: state.stayModule.filterBy,
        isMiniHeader: state.stayModule.isMiniHeader
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    loadUsers,
    removeUser,
    setFilter,
    setMiniHeader,
    loadStays
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)