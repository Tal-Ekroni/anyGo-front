import { utilService } from "../services/util.service"
import { CloseRounded } from '@material-ui/icons';

export function AmenitiesModal({ amenities, onToggleAmenitiesModal }) {
    return (
        <div className="amenities-modal-wrapper flex justify-center">
            <section className="amenities-modal-container ">
                <div className="close-modal-btn-container flex align-center">
                    <div className="close-btn">
                        <p onClick={() => { onToggleAmenitiesModal() }}> <CloseRounded /> </p>
                    </div>
                </div>

                <div className="amenities-modal-title">
                    <h4>What this place offers</h4>
                </div>

                <section className="amenities-list-container">
                    <ul className="amenities-list">
                        {amenities.map(amenity => {
                            return <li key={amenity} className="amenity-item flex">
                                <div className="amenity-icon-container">
                                    {utilService.getAmenitiesIcons(amenity)}
                                </div>
                                <div className="amenity-txt">
                                    <p>{amenity}</p>
                                </div>
                            </li>
                        })}
                    </ul>
                </section>
            </section>
        </div>
    )
}