
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FastfoodTwoTone, FireplaceOutlined, BeachAccess, OutdoorGrill, Kitchen, KingBed, Deck, LocalLaundryService, Pool, Bathtub, RoomService, Speaker, SportsEsports } from '@material-ui/icons';
import { Balcony, Checkroom, CoffeeMaker, Crib, Iron } from '@mui/icons-material';
import {
    FaSnowflake, FaBlender, FaCar, FaHotTub, FaPaw, FaSmoking, FaSmokingBan, FaTv, FaWifi,
    FaLock, FaThermometerHalf, FaDoorClosed, FaWineGlassAlt, FaSwimmingPool, FaAccessibleIcon
} from 'react-icons/fa';
import { utilService } from '../../services/util.service';
export class AssetAmenities extends React.Component {

    render() {
        const { amenities } = this.props
        return (
            <ul className="amenities-list flex">
                {amenities && amenities.map((amenity, idx) => {
                    if (idx <= 9) {
                        return <li key={amenity} className="amenity-item flex">
                            <div className="amenity-icon-container">
                                {utilService.getAmenitiesIcons(amenity)}
                            </div>
                            <div className="amenity-txt">
                                <p>{amenity}</p>
                            </div>
                        </li>
                    }
                })}
            </ul>
        )
    }

}