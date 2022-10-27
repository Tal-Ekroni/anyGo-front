import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StaysList } from '../cmps/stays-list'
import { loadStays } from '../store/stay.actions'
class _WishList extends Component {
    state = {
        userSavedStays: []
    }
    componentDidMount() {
        const { user } = this.props
        console.log(user);
        if (user) this.loadUserStays()
    }
    loadUserStays = () => {
        const { stays, user } = this.props
        const userStays = []
        user.mySaves.map(savedId => {
            stays.forEach(stay => {
                if (stay._id === savedId) userStays.push(stay)
            })
        })
        this.setState(({ userSavedStays: userStays }), () => { console.log(this.state); })
    }
    render() {
        const { userSavedStays } = this.state
        return (
            <main className="wishlist-page-container page-padding main-container">
                <div className="wishlist-page">
                    <h1>Wishlist</h1>
                    {userSavedStays.length ? <StaysList stays={userSavedStays} history={this.props.history} /> : <div>
                        <h4>There are no saved stays yet...</h4>
                    </div>}
                </div>
            </main>
        )
    }
}
function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        filterBy: state.stayModule.filterBy,
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadStays
}


export const WishList = connect(mapStateToProps, mapDispatchToProps)(_WishList)