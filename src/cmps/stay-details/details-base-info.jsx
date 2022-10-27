import { FaStar } from 'react-icons/fa'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import LazyLoad from '../preview-slider';

export function BasicInfo({ stay, isLiked, onToogleLikeStay, isMobilePics }) {
    return (
        <section className="info-imgs-container">
            <section className="stay-info">
                <div className="stay-name-conatiner">
                    <h2>{stay.name}</h2>
                </div>
                <section className="info-line flex space-between">
                    <div className="stay-info-conatiner flex">
                        <div className="stay-avg-info flex align-end">
                            <p className="info-star"><FaStar size={14} color="#FF5A5F" /></p>
                            <p className="info-line-score">{stay.reviewsAvg ? stay.reviewsAvg : 0}</p>
                            <p className="info-line-reviews">{`(${stay.reviews.length} reviews)`}</p>
                        </div>
                        <p className="dot">•</p>
                        <div className="host-location-container flex align-end">
                            <p className="info-line-loc">{stay.loc.address}</p>
                        </div>
                    </div>
                    <div className="user-btns-container flex">
                        <div className="share-btn-container flex align-center">
                            <p className="details-share"  ><IosShareIcon /></p>
                            <p>Share</p>
                        </div>
                        <div className="save-btn-container flex align-center" onClick={() => { onToogleLikeStay() }}>
                            <p className="details-like" >{!isLiked ? <FavoriteBorderIcon /> : <FavoriteIcon className="liked" />}</p>
                            <p>Save</p>
                        </div>
                    </div>
                </section>
            </section>
            <section className="asset-imgs-container flex  ">

                {!isMobilePics ? <div className="asset-imgs flex">
                    <div className="primary-img square-ratio"><img src={stay.imgUrls[0]} alt="" /></div>
                    <div className="imgs-container flex">
                        <div className="asset-img square-ratio"><img src={stay.imgUrls[1]} alt="" /></div>
                        <div className="asset-img square-ratio"><img src={stay.imgUrls[2]} alt="" /></div>
                    </div>
                    <div className="imgs-container flex">
                        <div className="asset-img square-ratio"><img src={stay.imgUrls[3]} alt="" /></div>
                        <div className="asset-img square-ratio"><img src={stay.imgUrls[4]} alt="" /></div>
                    </div>
                </div> : <div className="asset-imgs flex">
                    <div className="primary-img square-ratio"> <LazyLoad imgs={stay.imgUrls} /></div>
                </div>}
            </section>
        </section>
    )

}