import React from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../store/user.actions'
import travelImg from '../assets/svgs/undraw_off_road_-9-oae.svg'
import { TripsList } from '../cmps/trips-page/trips-list.jsx'
import { loadOrders } from '../store/order.actions'
import TravelSvg from '../assets/svgs/undraw_navigator_a479.svg'
class _TripsPage extends React.Component {
    state = {
        user: null,
        trips: []
    }
    async componentDidMount() {
        window.scrollTo(0, 0)
        await this.props.loadUser(this.props.user._id)
        await this.props.loadOrders(this.props.user._id, 'buyer')
    }
    render() {
        const { user, orders } = this.props
        return (
            <main className="trips-page-container main-container">
                {user && <section className="trips-container page-padding">
                    <div className="trips-title-container">
                        <h1>Trips</h1>
                    </div>
                    {!orders.length && <div className="no-trips-txt">
                        <p>When you’re ready to start planning your next trip, we’re here to help. </p>
                        <div className="trips-img-container">
                            <img src={travelImg} alt="" />
                        </div>
                    </div>}

                    {orders && orders.length ? <section className="trips-container">
                        <TripsList trips={orders} isHost={user.isHost} />
                    </section> : ''}
                </section>}
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        orders: state.orderModule.orders
    }
}
const mapDispatchToProps = {
    loadUser,
    loadOrders
}


export const TripsPage = connect(mapStateToProps, mapDispatchToProps)(_TripsPage)