// import { render } from '@testing-library/react';
import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

export class GuestsCheckoutModal extends React.Component {

    render() {
        const { onSelectGuests, toggleGuestsModal, trip } = this.props
        const { adults, kids, infants } = trip.guests
        // <div className="minus-guest-btn flex" onClick={() => { onSelectGuests('adults', 'minus') }}>
        return (
            <div className="guest-mega-container">
                {trip && <div className="guest-popup-container flex column">
                    <div className="screen" onClick={() => { toggleGuestsModal() }}>
                    </div>
                    <div className="guest-card flex space-between  align-center">
                        <div className="column">
                            <p className="guest-type">Adults</p>
                            <p className="guest-desc">Ages 13 or above</p>
                        </div>
                        <div className="guest-amount">
                            <p className={adults ? "guest-btn" : "guest-btn zero"} onClick={() => onSelectGuests('adults', 'minus')}><FaMinus /></p>
                            <p className="guest-amount-count">{adults ? adults : 0}</p>
                            <p className="guest-btn " onClick={() => onSelectGuests('adults', 'plus')}><FaPlus />
                            </p>
                        </div>
                    </div>
                    <div className="guest-card flex space-between align-center">
                        <div className="column">
                            <p className="guest-type">Children</p>
                            <p className="guest-desc">Ages 2-12</p>
                        </div>
                        <div className="guest-amount">
                            <p className={kids ? "guest-btn" : "guest-btn zero"} onClick={() => onSelectGuests('kids', 'minus')}><FaMinus /></p>
                            <p className="guest-amount-count">{kids ? kids : 0}</p>
                            <p className="guest-btn " onClick={() => onSelectGuests('kids', 'plus')}><FaPlus />
                            </p>
                        </div>
                    </div>
                    <div className="guest-card flex space-between  align-center">
                        <div className="column">
                            <p className="guest-type">Infants</p>
                            <p className="guest-desc">Under 2</p>
                        </div>
                        <div className="guest-amount ">
                            <p className={infants ? "guest-btn" : "guest-btn zero"} onClick={() => onSelectGuests('infants', 'minus')}><FaMinus /></p>
                            <p className="guest-amount-count">{infants?infants:0}</p>
                            <p className="guest-btn" onClick={() => onSelectGuests('infants', 'plus')}><FaPlus />
                            </p>
                        </div>
                    </div>

                </div>}
            </div>)
    }
}
