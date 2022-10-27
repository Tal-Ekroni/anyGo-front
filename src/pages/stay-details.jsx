import React from 'react'
import { connect } from 'react-redux'
import { loadStay, onEditStay } from '../store/stay.actions.js'
import { loadUser, onToggleLikedStay } from '../store/user.actions.js'
import { BasicInfo } from '../cmps/stay-details/details-base-info'
import { AssetSum } from '../cmps/stay-details/details-asset-sum'
import { AssetAmenities } from '../cmps/stay-details/details-amenities'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';
import { CheckoutForm } from '../cmps/stay-details/details-checkout-form'
import { ReviewsList } from '../cmps/stay-details/reviews-list'
import { StayMap } from '../cmps/stay-details/stay-map'
import { AddReview } from '../cmps/stay-details/add-review'
import { ReviewAvg } from '../cmps/stay-details/_reviews-avg'
import loader from '../assets/img/three-dots.svg'
import { socketService } from '../services/socket.service'
import { AmenitiesModal } from '../cmps/amenities-modal.jsx'
import { FaUserAlt } from 'react-icons/fa'
class _StayDetails extends React.Component {
    state = {
        stayReviews: [],
        trip: {
            startDate: null,
            endDate: null,
            guests: { adults: 1, kids: 0, infants: 0 },

        },
        isReadMoreOn: false,
        isLiked: null,
        isMobilePics: false,
        isAmenitiesModalOpen: false
    }
    setMobliePicsDisplay = () => {
        if (window.innerWidth <= 780) {
            this.setState({ isMobilePics: true })
        } else {
            this.setState({ isMobilePics: false })
        }
    }
    async componentDidMount() {
        this.setMobliePicsDisplay()
        const { user } = this.props
        const { stayId } = this.props.match.params
        window.addEventListener('resize', this.setMobliePicsDisplay)
        if (!stayId) this.props.history.push('/')
        else await this.props.loadStay(stayId)
        window.scrollTo(0, 0)
        if (this.props.stay) {
            socketService.setup()
            socketService.emit('setHost', this.props.stay.host._id)
            // socketService.on('getNotif', (ev) => {})
        }
        if (user) this.props.loadUser(user._id)

        this.isStayLiked()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.setMobliePicsDisplay)
        // socketService.off('getNotif', (ev) => {})
             this.props.loadStay()
    }

     componentDidUpdate(prevProps, prevState) {
        const { user } = this.props
        const { stayId } = this.props.match.params
        if (prevState.isLiked !== this.state.isLiked) {
            this.isStayLiked()
            if (user) this.props.loadUser(user._id)
        }
      
    }

    onToogleLikeStay = () => {
        const { user, stay } = this.props
        const { isLiked } = this.state
        if (user) {
            this.setState({ isLiked: !isLiked }, () => {
                this.props.onToggleLikedStay(stay._id, !isLiked, user._id)
            })
        }
    }

    isStayLiked = () => {
        const { user, stay } = this.props
        if (user && stay) {
            if (user.mySaves) {
                const isLiked = user.mySaves.filter(saved => saved === stay._id)
                if (isLiked.length) {
                    this.setState({ isLiked: true })
                }
            }
        }
    }

    handleChange = ({ startDate, endDate }) => {
        if (startDate) {
            this.setState(prevState => ({ trip: { ...prevState.trip, startDate } }))
        }
        if (endDate) {
            this.setState(prevState => ({ trip: { ...prevState.trip, endDate } }))
        }
    }

    setReviewsAvg = (avgScore) => {
        const { stay } = this.props
        stay.reviewsAvg = avgScore
        this.props.onEditStay(stay)
        this.setState(prevState => ({ stay: { ...prevState.stay, reviewsAvg: avgScore } }))

    }
    onToggleAmenitiesModal = () => {
        this.setState({ isAmenitiesModalOpen: !this.state.isAmenitiesModalOpen })

    }
    render() {
        const { isReadMoreOn, isLiked, isMobilePics, isAmenitiesModalOpen } = this.state
        const { stay, user } = this.props
        return (
            <section className="stay-details-section main-container">
                {(!stay) && <div className="loader-container flex align-center justify-center"><img src={loader} alt="loader" /></div>}
                {stay && <div className="stay-details-container">
                    <BasicInfo isMobilePics={isMobilePics} user={user} stay={stay} isLiked={isLiked} reviewsAvg={stay.reviewsAvg} onToogleLikeStay={this.onToogleLikeStay} />
                    <section className=" details-main-conatiner flex">
                        <div className="details-left-container">
                            <section className="host-info-container flex align-center space-between">
                                <div className="asset-short-info flex">
                                    <div className="host-by">
                                        <p>{`${stay.assetType} hosted by ${stay.host.fullname}`}</p>
                                    </div>
                                    <div className="asset-info">
                                        <p><span>{`${stay.capacity} guests`}</span> • <span >{`${stay.host.fullname} is Superhost!`}</span> •  <span>{`${stay.capacity} beds`}</span> </p>
                                    </div>
                                </div>
                                {!stay.host.imgUrl ? <div className="host-img-container">
                                    <FaUserAlt />
                                </div> : <div className="host-img-container">
                                    <img src={stay.host.imgUrl} alt="" />
                                </div>}
                            </section>
                            <AssetSum />
                            <section className="asset-desc-container">
                                <div className="asset-desc">
                                    {stay.summary > 100 ? <p >{stay.summary.substring(0, 100)} <span className="read-more" > More...</span></p> : <p  >{stay.summary}</p>}
                                </div>
                            </section>
                            <section className="amenities-container">
                                <h4>What this place offers</h4>
                                <div >
                                    <AssetAmenities amenities={stay.amenities} />
                                </div>
                                {stay.amenities.length > 10 && <div>
                                    <button className="amenities-btn" onClick={this.onToggleAmenitiesModal}>Show all {stay.amenities.length} amenities</button>
                                </div>}
                            </section>
                        </div>
                        <div className="details-right-container">
                            <CheckoutForm reviewsAvg={stay.reviewsAvg} />
                        </div>
                    </section>
                    <section className="page-bottom-container">
                        <div className="reviews-section-container" >
                            <ReviewAvg reviews={stay.reviews} setReviewsAvg={this.setReviewsAvg} />
                            <ReviewsList isReadMoreOn={isReadMoreOn} onToogleReadModal={this.onToogleReadModal} />
                            {user && <div className="add-review">
                                <AddReview stay={stay} />
                            </div>}
                        </div>
                        <StayMap location={stay.loc} />
                    </section>
                </div >}
                {isAmenitiesModalOpen ? <div className={"amenities-screen screen-open "} onClick={this.onToggleAmenitiesModal}></div> : ''}

                {stay ? isAmenitiesModalOpen && <AmenitiesModal onToggleAmenitiesModal={this.onToggleAmenitiesModal} amenities={stay.amenities} /> : ''}
                {/* {isReadMoreOn && <ReadMore txt={this.state.txt} onCloseReadModal={this.onCloseReadModal} />} */}
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        stay: state.stayModule.stay,
        reviews: state.reviewModule.reviews
    }
}
const mapDispatchToProps = {
    loadStay,
    onToggleLikedStay,
    loadUser,
    onEditStay
}
export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)