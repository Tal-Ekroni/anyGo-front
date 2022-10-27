import { Component } from "react";
import { connect } from 'react-redux'
import { loadUser } from '../../store/user.actions'
import { onUpdateOrder, onRemoveOrder } from '../../store/order.actions'
import MUIDataTable from "mui-datatables";
import { FaStar } from 'react-icons/fa'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

class _OrdersDashboard extends Component {
    state = {
        user: null,
        orders: null
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        const { user, orders } = this.props
        this.setState({ orders })

        if (user) this.props.loadUser(user._id)

    }
    getTime = (timestamp) => {
        var time = new Date(timestamp * 1000);
        var day = "0" + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = day.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }

    getData = () => {
        const { orders } = this.props
        const dataOrders = [];
        let editedOrder;
        if (orders) {
            orders.forEach(order => {
                editedOrder = {
                    stayName: order.stay.name,
                    buyerName: order.buyer.fullname,
                    buyerImg: <div className="user-order-img-container flex align-center">
                        <img src={order.buyer.imgUrl} alt="" />
                        <p>{order.buyer.fullname}</p>
                    </div>,
                    price: `$${order.totalPrice}`,
                    status: `${order.status.charAt(0).toUpperCase()}${order.status.substr(1)}`,
                    checkIn: this.getTime(order.startDate),
                    checkOut: this.getTime(order.endDate),
                    approveBtn: <div className="host-action-btns flex">
                        {order.status === 'pending' && <button className="approve-order-btn" onClick={() => { this.onApproveOrder(order._id) }}>Approve</button>}
                        <button className="approve-order-btn" onClick={() => { (order.status === "declined") ? this.onRemoveOrder(order._id) : this.onDeclinelOrder(order._id) }}>
                            {(order.status === "pending") ? 'Decline' : (order.status === "approved") ? 'Cancel' : 'Remove'}</button>
                    </div>

                }
                dataOrders.unshift(editedOrder)
                editedOrder = null
            })
            return dataOrders
        }
    }
    getTotalRate = (orders) => {
        let totalRate = 0;
        orders.forEach(order => { totalRate += order.stay.reviewsAvg })
        totalRate = totalRate / orders.length
        return totalRate
    }
    getTotalPrice = (orders) => {
        let totalPrice = 0;
        orders.forEach(order => { totalPrice += +order.totalPrice })
        return totalPrice
    }
    onApproveOrder = (orderId) => {
        const { orders } = this.props
        const order = orders.filter(order => order._id === orderId)
        order[0].status = "approved"
        this.props.onUpdateOrder(order[0])
    }
    onDeclinelOrder = (orderId) => {
        const { orders } = this.props
        const order = orders.filter(order => order._id === orderId)
        order[0].status = "declined"
        this.props.onUpdateOrder(order)
    }
    onRemoveOrder = (orderId) => {
        this.props.onRemoveOrder(orderId)
    }
    getOrdersStatus = (status) => {
        const { orders } = this.props
        const filterdOrders = orders.filter(order => order.status === status)
        return filterdOrders.length
    }
    render() {
        const { orders } = this.props
        const columns = [
            {
                name: 'buyerImg',
                label: "Name",
            },
            {
                name: "stayName",
                label: "Address",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "checkIn",
                label: "Check in",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "checkOut",
                label: "Check out",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "price",
                label: "Price",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "approveBtn",
                label: "Actions",

            }
        ];
        const options = {
            filter: true,
            filterType: "dropdown",
        };

        return (
            <main className="notifications-page-container  ">
                <section className="dashboard-header-container flex">
                    <div className="total-rate-container flex column space-between">
                        <div>
                            <p className="dashboard-label">Total Rate</p>
                        </div>
                        <div className="dashboard-value flex space-between align-center ">
                            <div className="flex  align-center ">
                                <p className="checkout-star"><FaStar size={13} color="#FF5A5F" /></p>
                                <p className="dash-avg-score">{(!this.getTotalRate(orders)) ? 0 : this.getTotalRate(orders).toFixed(1)}</p>
                            </div>
                            <div className="dash-stats-arrow-container flex">
                                <p>{<ArrowRightAltRoundedIcon className={`stat-arrow ${(Math.random() >= 0.5) ? 'down' : 'up'}`} />}</p>
                                <p className="dash-review-stat">{Math.floor(Math.random() * 7) + 1}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="dash-earning-container flex column space-between">
                        <div>
                            <p className="dashboard-label">Monthly earnings</p>
                        </div>
                        <div className="dashboard-value">
                            <p className="dash-avg-earning">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.getTotalPrice(orders))}</p>
                        </div>
                    </div>
                    <div className="dash-earning-container flex column space-between">
                        <div>
                            <p className="dashboard-label">Orders</p>
                        </div>
                        <div className="orders-sec-dash flex ">
                            <div className="dashboard-value flex align-center">
                                <div className="dash-orders-circle approved"></div>
                                <p className="dash-avg-order">{this.getOrdersStatus('approved')}/{orders.length}</p>
                            </div>
                            <div className="dashboard-value flex align-center">
                                <div className="dash-orders-circle pending"></div>
                                <p className="dash-avg-order">{this.getOrdersStatus('pending')}/{orders.length}</p>
                            </div>
                            <div className="dashboard-value flex align-center">
                                <div className="dash-orders-circle declined"></div>
                                <p className="dash-avg-order">{this.getOrdersStatus('declined')}/{orders.length}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="notifications-container">
                    <MUIDataTable
                        title={"Your orders"}
                        data={this.getData()}
                        columns={columns}
                        options={options}
                    />
                </section>
            </main>
        )
    }

}
function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadUser,
    onUpdateOrder,
    onRemoveOrder
}

export const OrdersDashboard = connect(mapStateToProps, mapDispatchToProps)(_OrdersDashboard)