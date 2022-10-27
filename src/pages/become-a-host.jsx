import React from 'react'
import { connect } from 'react-redux'
import { onBecomeHost, loadUser } from '../store/user.actions.js'
import { FaAirbnb } from 'react-icons/fa'


class _BecomeAHost extends React.Component {

    onBecomeHost = () => {
        if (this.props.user) {
            console.log('loloa');
            const userId = this.props.user._id
            this.props.onBecomeHost(userId)
            this.props.history.push('/host')
        }
        else this.props.history.push('/')
    }
    getBtnDivs = () => {
        let divStr = []
        for (let i = 0; i < 100; i++) {
            divStr.push(<div key={i + 1} className="cell" ></div >)
        }
        return divStr
    }
    render() {
        return (
            <section className="be-host-container">
                <div className="be-host-left-container flex column ">
                    <div className="be-host-logo flex align-center" onClick={() => { this.props.history.push('/') }}><FaAirbnb color="#fff" size={40} /></div>
                    <div className="be-host-txt-container flex column align-center">
                        <div><h1>Hosting</h1></div>
                        <div><h1>makes AnyGo,</h1></div>
                        <div><h1>AnyGo</h1></div>
                    </div>
                    <section className="be-host-btn-container flex align-center">
                        <div className="checkout-btn-container " onClick={this.onBecomeHost}>
                            {this.getBtnDivs()}
                            <div className="content">
                                {/* <button className="checkout-btn" ><span>Add stay</span> </button> */}
                                <button  className="checkout-btn">Try hosting</button>
                            </div>
                        </div>
                    </section>
                    {/* <div className="be-host-btn-container flex  align-center"> */}
                    {/* </div> */}
                </div>
                <div className="be-host-img-container">
                    <img src="https://res.cloudinary.com/dkbfdybze/image/upload/v1633436197/become-host_ufwcx6.jpg" alt="" />
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        stays: state.stayModule.stays,
    }
}
const mapDispatchToProps = {
    onBecomeHost,
    loadUser
}

export const BecomeAHost = connect(mapStateToProps, mapDispatchToProps)(_BecomeAHost)