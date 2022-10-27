import React from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";

class _HostChart extends React.Component {
    state = {
        staysStatus: []
    }
    componentDidMount() {
        this.getStaysStatus()
    }
    getStaysStatus = () => {
        const { orders } = this.props
        var pendingOrders = orders.filter(order => { return order.status === 'pending' })
        var approvedOrders = orders.filter(order => { return order.status === 'approved' })
        var declinedOrders = orders.filter(order => { return order.status === 'declined' })
        this.setState({ staysStatus: [declinedOrders.length, pendingOrders.length, approvedOrders.length] })
    }
    render() {
        const { staysStatus } = this.state
        const staysData = {
            labels: ["Declined", "Pending", "Approved"],
            datasets: [
                {
                    data: staysStatus,
                    width: 200,
                    backgroundColor: ["#6f019c", "#d9534f", "#5cb85c"],
                    borderColor: [
                        "#6f019c",
                        "#d9534f",
                        "#5cb85c"
                    ],
                    borderWidth: 3
                }
            ]
        }
        return (
            <div>
                <div className="chart-container">
                    <h1>Orders Status</h1>
                    <p>Here you can see your orders status</p>
                    <Doughnut data={staysData} />
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        orders: state.orderModule.orders
    }
}
// const mapDispatchToProps = {

// }


export const HostChart = connect(mapStateToProps)(_HostChart)