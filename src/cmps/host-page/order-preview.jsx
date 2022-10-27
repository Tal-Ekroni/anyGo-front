import React from "react";
import { connect } from 'react-redux'
import { onRemoveOrder, onApproveOrder, onUpdateOrder } from '../../store/order.actions'
import { loadUser } from '../../store/user.actions'
import { utilService } from "../../services/util.service";
import { FaUserAlt } from "react-icons/fa";

class _OrderPreview extends React.Component {
    state = {
        order: null,
        isApproved: false
    }
    componentDidMount() {
        const { order } = this.props
        if (order.status === 'pending') this.setState({ order, isApproved: false })
        if (order.status === 'approved') this.setState({ order, isApproved: true })
    }


    getTime = (time) => {
        time = new Date(time * 1000);
        var date = '0' + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = date.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }
    onApproveOrder = (order) => {
        order.status = "approved"
        this.props.onUpdateOrder(order)
    }
    onDeclinelOrder = (order) => {
        order.status = "declined"
        this.props.onUpdateOrder(order)
    }
    onRemoveOrder = (orderId) => {
        this.props.onRemoveOrder(orderId)
    }
    render() {
        const { order } = this.props
        const { adults, kids, infants } = order.guests
        return (
            <div className="order-preview-container"  >
                {order &&
                    <section>
                        <div className="order-preview-details">
                            <div className="order-user-info flex space-between" >
                                {!order.buyer.imgUrl ? <div className="user-img-container flex align-center justify-content">

                                    <FaUserAlt />
                                </div> : <div className="user-img-container">
                                    <img src={order.buyer.imgUrl} alt="" />
                                </div>}
                                <div className="txt-info-container flex column">
                                    <div className="order-username-container">
                                        <p className="order-username">{order.buyer.fullname} </p>
                                    </div>
                                    <div className="review-username-container">
                                        {typeof order.createdAt === 'number' ? <p >{utilService.timeToShow(order.createdAt)} </p> : <p >{order.createdAt} </p>}
                                    </div>
                                </div>
                            </div>
                            <div><h4>{order.stay.name}</h4></div>
                            <div>{this.getTime(order.startDate)}-{this.getTime(order.endDate)}</div>
                            <div>
                                <p>Total Price: ${order.totalPrice} for {order.totalNights} nights </p>
                            </div>
                            <div>
                                {(adults + kids + infants === 1) && <p > Guests:{adults + kids + infants}</p>}
                                {(adults + kids + infants > 1) && <p>{adults > 0 && <span>Adults:{adults}</span>} {kids > 0 && <span>Children:{kids} </span>} {infants > 0 && <span> Infants:{infants}</span>}</p>}
                            </div>

                            {order.status === 'pending' && <div className="host-btns-container flex space-between">
                                <div>
                                    <button onClick={() => { this.onApproveOrder(order) }} className="host-btns approve-btn">Approve</button>
                                </div>
                                <div>
                                    <button onClick={() => { this.onDeclinelOrder(order) }} className="host-btns cancel-btn">Decline</button>
                                </div>
                            </div>}
                            {order.status === 'canceled' && <div className="host-btns-container flex space-between">
                                <div>
                                    <button className="host-btns approve-btn">Canceled</button>
                                </div>
                                <div>
                                    <button onClick={() => { this.onRemoveOrder(order._id) }} className="host-btns cancel-btn">Remove</button>
                                </div>
                            </div>}
                            {order.status === 'declined' && <div className="host-btns-container flex space-between">
                                <div>
                                    <button className="host-btns approve-btn apporved">Declined</button>
                                </div>
                                <div>
                                    <button onClick={() => { this.onRemoveOrder(order._id) }} className="host-btns cancel-btn">Remove</button>
                                </div>
                            </div>}
                            {order.status === 'approved' && <div className="host-btns-container flex space-between">
                                <div>
                                    <button className="host-btns approve-btn apporved">Approved!</button>
                                </div>
                                <div>
                                    <button onClick={() => { this.onDeclinelOrder(order) }} className="host-btns cancel-btn">Decline</button>
                                </div>
                            </div>}
                        </div >
                    </section>}
            </div >
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        stays: state.stayModule.stays
    }
}

const mapDispatchToProps = {
    onRemoveOrder,
    onApproveOrder,
    onUpdateOrder,
    loadUser
}


export const OrderPreview = connect(mapStateToProps, mapDispatchToProps)(_OrderPreview)