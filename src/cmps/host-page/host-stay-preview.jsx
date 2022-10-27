import React from "react";
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";
import { onRemoveStay } from '../../store/stay.actions'

class _HostStayPreview extends React.Component {
    state = {
        stay: null,
        isApproved: false
    }
    componentDidMount() {
        const { stay } = this.props
        if (stay.status === 'pending') this.setState({ stay, isApproved: false })
        if (stay.status === 'approved') this.setState({ stay, isApproved: true })
    }
    onRemoveStay = (stayId) => {
        this.props.onRemoveStay(stayId)
    }
    render() {
        const { stay } = this.props
        return (
            <div className="order-preview-container"  >
                {stay.name &&
                    <section>
                        <div className="order-preview-details">
                            <div><h4>{stay.name}</h4></div>
                            <div className="stay-style flex">
                                <h3><span>{stay.assetType}</span> &#183; <span>{stay.loc.address.split(',')[0]}</span></h3>
                            </div>
                            <div className="stay-name" >
                                <h3>{stay.name}</h3>
                            </div>
                            <div className="host-btns-container flex space-between">
                                <button className="host-btns approve-btn"><NavLink to={`/stay/${stay._id}`}>Stay page</NavLink></button>
                                <button onClick={() => { this.onRemoveStay(stay._id) }} className="host-btns cancel-btn">Remove</button>
                            </div>

                        </div >
                    </section>}
            </div >
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onRemoveStay,

}


export const HostStayPreview = connect(mapStateToProps, mapDispatchToProps)(_HostStayPreview)