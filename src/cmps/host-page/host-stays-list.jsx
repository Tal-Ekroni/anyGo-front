import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux'
import { Component } from "react";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {onRemoveStay} from '../../store/stay.actions'
// import { HoststayPreview } from "./host-stay-preview";

 class _HostStaysList extends Component {
    getData = () => {
        const { stays, orders } = this.props
        const dataStays = [];
        let editedOrder;
        if (stays) {
            stays.forEach(stay => {
                editedOrder = {
                    stayName: stay.name,
                    address: stay.loc.address,
                    price: `$${stay.price}`,
                    reviews: <div className="host-stays-reviews flex align-center">
                        <p className="checkout-star"><FaStar size={13} color="#FF5A5F" /></p>
                        <p >{stay.reviewsAvg}</p>
                        <p >({stay.reviews.length} reviews)</p>
                    </div>,
                    // reviews: stay.reviews.length,
                    // reviewsAvg: stay.reviewsAvg,
                    orders: orders.filter(order => order.stay._id === stay._id).length,
                    link: <div className="flex align-center">
                        <button className="remove-stay-btn" onClick={()=>this.onRemoveStay(stay._id)}>Remove stay</button>
                        <NavLink className="stay-link" to={`/stay/${stay._id}`}>Go to stay</NavLink>
                    </div>
                }
                dataStays.unshift(editedOrder)
                editedOrder = null
            })
            return dataStays
        }
    }
    onRemoveStay = (id) => {
        this.props.onRemoveStay(id)
    }
    render() {
        const columns = [

            {
                name: 'stayName',
                label: "Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "address",
                label: "Address",
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
                name: "reviews",
                label: "Reviews",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "orders",
                label: "Total orders",

            },
            {
                name: "link",
                label: " ",

            }
        ];
        const options = {
            filter: true,
            filterType: "dropdown",
        };
        return (
            <div className="notifications-page-container">
                <section className="notifications-container">
                    <MUIDataTable
                        title={"Your orders"}
                        data={this.getData()}
                        columns={columns}
                        options={options}

                    />
                </section>
                {/* {stays.map((stay, idx) => */}
                {/* <HoststayPreview key={idx} stay={stay} /> */}
                {/* )} */}

            </div>)
    }
}
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        orders: state.orderModule.orders,
        stays: state.stayModule.stays,
    }
}
const mapDispatchToProps = {
onRemoveStay
}


export const HostStaysList = connect(mapStateToProps, mapDispatchToProps)(_HostStaysList)