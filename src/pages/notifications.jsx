import { Component } from "react";
import { connect } from 'react-redux'
import { loadUser, updateUser } from '../store/user.actions'
import MUIDataTable from "mui-datatables";


class _NotificationsPage extends Component {
    state = {
        user: null,
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    async componentWillUnmount() {
        const { user } = this.props
        if (user?.notifications?.length) {
            const userUnreadNotifs = user.notifications.map(notif => ({ ...notif, isRead: true }))
            await this.props.updateUser({ ...user, notifications: userUnreadNotifs })

        }
    }
    getTime = (timestamp) => {
        var time = new Date(timestamp);
        var day = "0" + time.getDate();
        var month = "0" + (time.getMonth() + 1);
        var year = "0" + time.getFullYear();
        var formattedTime = day.substr(-2) + '.' + month.substr(-2) + '.' + year.substr(-2);
        return formattedTime
    }
    getData = () => {
        const { notifications } = this.props.user
        const dataNotifications = [];
        let editedNotification;
        if (notifications) {
            notifications.forEach(notification => {
                editedNotification = {
                    ...notification,
                    byUserImg: <div className="user-order-img-container flex align-center">
                        <img src={notification.byUserImg} alt="" />
                        <p>{notification.byUser}</p>
                    </div>,
                    createdAt: this.getTime(notification.createdAt)
                    // approveBtn: <div className="host-action-btns flex">
                    //     {notification.status === 'pending' && <button className="approve-notification-btn" onClick={() => { this.onApproveNotification(notification._id) }}>Approve</button>}
                    //     <button className="approve-notification-btn" onClick={() => { (notification.status === "declined") ? this.onRemoveNotification(notification._id) : this.onDeclinelNotification(notification._id) }}>
                    //         {(notification.status === "pending") ? 'Decline' : (notification.status === "approved") ? 'Cancel' : 'Remove'}</button>
                    // </div>
                }
                dataNotifications.unshift(editedNotification)
                editedNotification = null
            })
            return dataNotifications
        }
    }
    render() {
        const { user } = this.props
        const columns = [
            {
                name: "byUserImg",
                label: "Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "notifTxt",
                label: "Notification",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "createdAt",
                label: "Time",
                options: {
                    filter: true,
                    sort: true
                }
            }
        ];

        const options = {
            filter: true,
            filterType: "dropdown",
        };

        return (
            <main className="notifications-page-container  main-container">
                <section className="page-padding">
                    <div className="notifications-title-container">
                        <h1>Notifications</h1>
                    </div>
                    {user && <section className="notifications-container" >
                        <MUIDataTable
                            title={"Notifications list"}
                            data={this.getData()}
                            columns={columns}
                            options={options}

                        />
                    </section>}
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
    updateUser,
    loadUser
}


export const NotificationsPage = connect(mapStateToProps, mapDispatchToProps)(_NotificationsPage)