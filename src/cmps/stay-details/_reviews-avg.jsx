import React from "react";
import { FaStar } from "react-icons/fa";

export class ReviewAvg extends React.Component {
    state = {
        cleanliness: null,
        communication: null,
        checkIn: null,
        accuracy: null,
        location: null,
        value: null,
        totalAvg: null
    }
    componentDidMount() {
        const types = ["cleanliness", "communication", "checkIn", "accuracy", "location", "value"]
        types.forEach(type => {
            this.setState(prevState => ({ ...prevState, [type]: this.getAvrage(type) }), () => {
                this.getTotalAvg()
            })
        })
    }
    getAvrage = (type) => {
        const { reviews } = this.props
        let avgScore = 0;
        reviews.map(review => avgScore += +review[type])
        avgScore = ((avgScore / reviews.length))
        console.log(avgScore);
        // if (typeof avgScore !== Number) avgScore = 0
        // avgScore = avgScore.toFixed(1)
        return avgScore.toFixed(1)
    }
    getTotalAvg = () => {
        let totalReviewAvg = 0;
        Object.keys(this.state).forEach((key, index) => {
            totalReviewAvg += +this.state[key]
        })
        totalReviewAvg = (totalReviewAvg / 6).toFixed(1)
        // if (typeof +totalReviewAvg === NaN) totalReviewAvg = 0
        this.setState(prevState => ({ ...prevState, totalAvg: totalReviewAvg }), () => {
            this.props.setReviewsAvg(+totalReviewAvg)
        })

    }
    render() {
        const { reviews } = this.props
        const types = this.state
        return (
            <section>
                <div className="reviews-sec-title-container">
                    <h1 className="reviews-section-title flex" ><FaStar
                        size={15}

                        color="#FF5A5F" /> <span>{this.state.totalAvg}</span> <span>Reviews</span> <span>•</span>{reviews.length} Reviews</h1>
                </div>
                <div className="review-avg-container flex space-between" >
                    <div className="left-review">
                        {Object.keys(types).map((key, index) => {
                            if (index <= 2) {
                                return <div key={key} className="line flex align-center space-between">
                                    <p className="line-title">{key.charAt(0).toUpperCase()}{key.slice(1)}</p>
                                    <div className="loader-container flex align-center space-between">
                                        <div className="line-loader-container">
                                            <div className="line-loader" style={{ width: `${+this.state[key] * 20}%` }}></div>
                                        </div>
                                        <p className="review-score">{this.state[key]}</p>
                                    </div>
                                </div>
                            }
                        })}
                    </div>
                    <div className="right-review">
                        {Object.keys(types).map((key, index) => {
                            if (index > 2 && index <= 5) {
                                return <div key={key} className="line flex align-center space-between">
                                    <p className="line-title">{key.charAt(0).toUpperCase()}{key.slice(1)}</p>
                                    <div className="loader-container flex align-center space-between">
                                        <div className="line-loader-container">
                                            <div className="line-loader" style={{ width: `${+this.state[key] * 20}%` }}></div>
                                        </div>
                                        <p className="review-score">{this.state[key]}</p>
                                    </div>
                                </div>
                            }
                        })}
                    </div>
                </div >
            </section >
        )
    }
}
