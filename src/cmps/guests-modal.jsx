import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
export class GuestsModal extends React.Component {


    render() {
        const { adultNumber, kidsNumber, infantsNumber, onSelectAmount } = this.props
        return (
            <div className="guest-modal flex column">
                <div className="guest-card flex space-between  align-center">
                    <div className="column">
                        <p className="guest-type">Adults</p>
                        <p className="guest-desc">Ages 13 or above</p>
                    </div>
                    <div className="guest-amount">
                        <p className={adultNumber ? "guest-btn" : "guest-btn zero"} onClick={() => onSelectAmount('adultNumber', -1)}><FaMinus /></p>
                        <p className="guest-amount-count">{adultNumber ? adultNumber : 0}</p>
                        <p className="guest-btn " onClick={() => onSelectAmount('adultNumber', 1)}><FaPlus />
                        </p>
                    </div>
                </div>
                <div className="guest-card flex space-between align-center">
                    <div className="column">
                        <p className="guest-type">Children</p>
                        <p className="guest-desc">Ages 2-12</p>
                    </div>
                    <div className="guest-amount">
                        <p className={kidsNumber ? "guest-btn" : "guest-btn zero"} onClick={() => onSelectAmount('kidsNumber', -1)}><FaMinus /></p>
                        <p className="guest-amount-count">{kidsNumber ? kidsNumber : 0}</p>
                        <p className="guest-btn " onClick={() => onSelectAmount('kidsNumber', 1)}><FaPlus />
                        </p>
                    </div>
                </div>
                <div className="guest-card flex space-between  align-center">
                    <div className="column">
                        <p className="guest-type">Infants</p>
                        <p className="guest-desc">Under 2</p>
                    </div>
                    <div className="guest-amount ">
                        <p className={infantsNumber ? "guest-btn" : "guest-btn zero"} onClick={() => onSelectAmount('infantsNumber', -1)}><FaMinus /></p>
                        <p className="guest-amount-count">{infantsNumber ? infantsNumber : 0}</p>
                        <p className="guest-btn" onClick={() => onSelectAmount('infantsNumber', 1)}><FaPlus />
                        </p>
                    </div>
                </div>

            </div>
        )
    }
}