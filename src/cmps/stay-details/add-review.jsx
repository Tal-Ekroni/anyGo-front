import { Component } from 'react'
import { connect } from 'react-redux'
import { TextareaAutosize } from '@material-ui/core';
import { onEditStay } from '../../store/stay.actions.js'
import { loadUser } from '../../store/user.actions'
import { utilService } from '../../services/util.service.js';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

class _AddReview extends Component {
    state = {
        newReview: {
            by: {
                fullname: this.props.user.fullname,
                _id: this.props.user._id,
                imgUrl: this.props.user.imgUrl
            },
            createdAt: null,
            txt: '',
            id: utilService.makeId(8),
            cleanliness: null,
            communication: null,
            checkIn: null,
            accuracy: null,
            location: null,
            value: null
        }

    }
    componentDidMount() {
        this.clearReview()
        if (this.props.user) this.props.loadUser(this.props.user._id)
        this.setState({
            by: {
                fullname: this.props.user.fullname,
                _id: this.props.user._id,
                imgUrl: this.props.user.imgUrl
            }
        })
    }
    onRemove = async reviewId => {
        await this.props.removeReview(reviewId)
        // this.props.history.push('/login')
    }
    clearReview = () => {
        this.setState({
            newReview: {
                createdAt: null,
                txt: '',
                id: utilService.makeId(),
                cleanliness: null,
                communication: null,
                checkIn: null,
                accuracy: null,
                location: null,
                value: null
            }
        })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ newReview: { ...prevState.newReview, [field]: value } }))
    }
    changeRating = (score, name) => {
        this.setState(prevState => ({ newReview: { ...prevState.newReview, [name]: score } }))
    }

    formSubmited = (ev) => {
        ev.preventDefault()
        const { stay } = this.props
        if (this.props.user._id) {
            this.setState(prevState => ({ newReview: { ...prevState.newReview, createdAt: Date.now() } }), () => {
                const review = this.state.newReview
                review.by = {
                    fullname: this.props.user.fullname,
                    _id: this.props.user._id,
                    imgUrl: this.props.user.imgUrl
                }

                stay.reviews = [review , ...stay.reviews]
                console.log('before send', stay);
                this.props.onEditStay(stay)
                this.clearReview()
            })
        }
    }
    getBtnDivs = () => {
        let divStr = []
        for (let i = 0; i < 100; i++) {
            divStr.push(<div key={i} className="cell" ></div >)
        }
        return divStr
    }
    render() {
        const { cleanliness, communication, checkIn, accuracy, location, value, txt } = this.state.newReview
        // const reviewStr = { leftReview: ['cleanliness', 'communication', 'checkIn'], rightReview: ['accuracy', 'location', 'value'] }
        const style = {
            padding: '20px',
            width: '100%',
            height: ' 150px',
            resize: 'none',
            borderRadius: '13px',
            borderColor: ' #bdbcbc',
            fontFamily: "circular-book",
            fontSize: "1rem"
        }
        return (
            <div >
                <div className="add-review-title-container">
                    <h3>Add review</h3>
                </div>
                <form action="" className="add-form flex column " onSubmit={this.formSubmited} >
                    <div className=" add-review-container flex ">

                        {/* <div className="line flex">
                            <p>Cleanliness</p>
                            <Rating
                                onChange={(ev) => this.changeRating(ev, 'cleanliness')}
                                initialRating={cleanliness}
                                fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                            />
                        </div> */}
                        <div className="left-review">
                            <div className="line flex">
                                <p>Cleanliness</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'cleanliness')}
                                    initialRating={cleanliness}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Communication</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'communication')}
                                    initialRating={communication}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Check in</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'checkIn')}
                                    initialRating={checkIn}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                        </div>
                        <div className="right-review">
                            <div className="line flex">
                                <p>Accuracy</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'accuracy')}
                                    initialRating={accuracy}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Location</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'location')}
                                    initialRating={location}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Value</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'value')}
                                    initialRating={value}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="add-txt-container flex">
                        <TextareaAutosize
                            style={style}
                            value={txt}
                            placeholder="Write you opinion about this stay..."
                            className="review-input"
                            onChange={this.handleChange}
                            name="txt"
                            autoComplete="off" />
                    </div>
                    <div className="add-review-btn flex">

                        <div className="checkout-btn-container" onClick={this.formSubmited}>
                            {this.getBtnDivs()}
                            <div className="content">
                                <button type="submit" className="checkout-btn" ><span>Add</span></button>
                            </div>

                        </div>
                    </div>
                </form>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    onEditStay,
    loadUser
}
export const AddReview = connect(mapStateToProps, mapDispatchToProps)(_AddReview)
// export const AddReview = connect(mapStateToProps)(_AddReview)