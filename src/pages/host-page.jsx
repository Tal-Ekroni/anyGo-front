import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../store/user.actions'
import { AddStay } from '../cmps/host-page/add-stay';
import { loadOrders } from '../store/order.actions'
import { loadStays, setFilter } from '../store/stay.actions'
import { HostStaysList } from '../cmps/host-page/host-stays-list';
import { OrdersDashboard } from '../cmps/host-page/dash-board';

// import { OrdersList } from '../cmps/hosts-list.jsx'
class _HostPage extends React.Component {
    state = {
        user: null,
        orders: [],
        stays: [],
        selectedTab: 'orders'
    }
    async componentDidMount() {
        window.scrollTo(0, 0)
        const { user } = this.props
        this.onGetHostStays()
        if (user) {
            try {
                await this.props.loadOrders(user._id, 'host')
                await this.props.loadStays(this.props.filterBy)
            } catch (err) {
            }
        }
        else {
            this.props.history.push('/')
        }
    }
    componentWillUnmount() {
        this.onClearFilter()

    }
    onClearFilter = () => {
        const { filterBy } = this.props
        filterBy.hostId = ''
        this.props.setFilter(filterBy)
    }
    onGetHostStays = () => {
        const newFilter = this.props.filterBy
        newFilter.hostId = this.props.user._id
        this.props.setFilter(newFilter)
    }

    onChangeTab = (ev, value) => {
        this.setState({ selectedTab: value })
    }

    render() {
        const { user, orders, stays } = this.props
        const { selectedTab } = this.state
        return (
            <main className="host-page-container main-container">
                {/* <div className=" page-padding"> */}
                <div>
                    <section className="host-tabs-container">
                        <Tabs
                            value={selectedTab}
                            onChange={this.onChangeTab}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="orders" label={orders ? `Orders (${orders.length})` : 'Orders'} />
                            <Tab value="my-stays" label="My stays" />
                            <Tab value="add-stay" label="Add a stay" />
                            {/* <Tab value="stats" label="Stats" /> */}
                        </Tabs>
                    </section>
                    {user && <section className="host-container">

                        {selectedTab === 'orders' && <div>
                            <div className="orders-container">
                                <OrdersDashboard orders={orders} />
                                {/* <OrdersList orders={orders} /> */}
                            </div>
                        </div>}
                        {selectedTab === 'my-stays' && <div className="orders-container">
                            {stays && <HostStaysList orders={orders} stays={stays} />}
                        </div>}
                        {/* {selectedTab === 'stats' && <div>
                            <HostChart />
                        </div>} */}
                        {selectedTab === 'add-stay' && <div>
                            <AddStay />
                        </div>}
                    </section>}
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        orders: state.orderModule.orders,
        stays: state.stayModule.stays,
        filterBy: state.stayModule.filterBy


    }
}
const mapDispatchToProps = {
    loadUser,
    loadOrders,
    loadStays,
    setFilter


}


export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage)