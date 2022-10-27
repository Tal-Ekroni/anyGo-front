import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import pet from '../assets/img/pets-allowed.jpg'
import duplex from '../assets/img/entire-duplex.jpg'
import cap from '../assets/img/large-capacity.jpg'
import unique from '../assets/img/unique-stays.jpg'
import { setFilter, setMiniHeader } from '../store/stay.actions';
const locations = [{ city: 'Porto', country: 'Portugal', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-1_avfpxl.png' }, { city: 'Barcelona', country: 'Spain', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-2_qchnx7.png' }, { city: 'Tel Aviv', country: 'Israel', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521280/location%20previews/location-preview-3_fndewl.png' }, { city: 'Paris', country: "France", imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-4_nqshaa.jpg' }, { city: 'London', country: 'United Kingdom', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-5_pbuhtd.jpg' }, { city: 'New York', country: 'United States', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-6_kynrq5.png' }, { city: 'Amsterdam', country: 'Netherlands', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521278/location%20previews/location-preview-7_unmsuc.jpg' }, { city: 'Rome', country: 'Italy', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-8_yjbewa.png' }]

class _HomePage extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.setMiniHeader(false)
        window.addEventListener('resize', this.setHeaderDisplay)
        this.setHeaderDisplay()
    }
    componentWillUnmount() {
        this.props.setMiniHeader(true)
        window.removeEventListener('resize', this.setHeaderDisplay)
        window.removeEventListener('scroll', this.onSetMiniHeader)
    }
    onSetMiniHeader = (ev) => {
        if (ev.target.scrollingElement.scrollTop > 50) {
            this.props.setMiniHeader(true)
        } else {
            this.props.setMiniHeader(false)
        }
    }
    setHeaderDisplay = () => {
        if (window.innerWidth <= 780) {
            window.removeEventListener('scroll', this.onSetMiniHeader)
            this.props.setMiniHeader(true)
        } else {
            window.addEventListener('scroll', this.onSetMiniHeader)
            this.props.setMiniHeader(false)
        }
    }
    changeCount = (diff) => {
        const action = { type: 'CHANGE_COUNT', diff }
        this.props.dispatch(action)
    }
    onClickLoc = (val, type) => {
        const newFilter = { ...this.props.filterBy }
        newFilter[type] = val
        this.props.setFilter(newFilter)
        this.props.history.push('/explore')
    }
    render() {
        return (
            <section className="home-page flex column main-container">
                <div className="hero  full flex justify-center align-center">
                    <div className="where-to-go flex justify-center align-center">
                        <h3>Not sure where to go? Perfect.</h3>
                        <button className="flex-btn flex justify-center align-center">
                            <Link to="/explore">I'm flexible
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="sug-loc">
                    <h2>Popular destinations</h2>
                    <div className="locations">
                        {locations.map((location, idx) => <div key={idx + 1} className="loc-section flex">
                            <img src={location.imgUrl} alt="" className="loc-img" onClick={() => { this.onClickLoc(location.city, 'location') }} />
                            <div className="loc-info flex column justify-center">
                                <p className="city-name">{location.city}</p>
                                <p className="country-name">{location.country}</p>
                            </div>
                        </div>)}
                    </div>
                </div>
                <div className="live-any flex column">
                    <h2>Live Anywhere</h2>
                    <div className="live-loc flex space-between">

                        <div className="live-card flex column">
                            <img className="live-img" alt="alt-live" onClick={() => { this.onClickLoc('duplex', 'assetType') }} src={duplex} />
                            <p>Entire duplex</p>
                        </div>
                        <div className="live-card flex column">
                            <img className="live-img" alt="alt-live" onClick={() => { this.onClickLoc('Pets allowed', 'amenity') }} src={pet} />
                            <p>Pets Allowed</p>
                        </div>
                        <div className="live-card flex column">
                            <img className="live-img" alt="alt-live" onClick={() => { this.onClickLoc(7, 'capacity') }} src={cap} />
                            <p>Large capacity</p>
                        </div>
                        <div className="live-card flex column">
                            <img className="live-img" alt="alt-live" onClick={() => { this.onClickLoc('unique', 'uniqueStay') }} src={unique} />
                            <p>Unique stays</p>
                        </div>
                    </div>

                </div>
                <div className="host-banner flex column justify-center">
                    <h1>Try hosting</h1>
                    <p>Earn extra income and unlock new opportunities by sharing your space</p>
                    <button className="try-host-btn" onClick={()=>(this.props.user.isHost) ?this.props.history.push('/host') : this.props.history.push('/become-a-host')}>Learn More</button>
                </div>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.userModule.count,
        filterBy: state.stayModule.filterBy,
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    setFilter,
    setMiniHeader
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)