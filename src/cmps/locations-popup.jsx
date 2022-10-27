import React from "react";
const locations = [{ city: 'Porto', country: 'Portugal', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-1_avfpxl.png' }, { city: 'Barcelona', country: 'Spain', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-2_qchnx7.png' }, { city: 'Tel Aviv', country: 'Israel', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521280/location%20previews/location-preview-3_fndewl.png' }, { city: 'Paris', country: "France", imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-4_nqshaa.jpg' }, { city: 'London', country: 'United Kingdom', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-5_pbuhtd.jpg' }, { city: 'New York', country: 'United States', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-6_kynrq5.png' }, { city: 'Amsterdam', country: 'Netherlands', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521278/location%20previews/location-preview-7_unmsuc.jpg' }, { city: 'Rome', country: 'Italy', imgUrl: 'https://res.cloudinary.com/dpbqsvvtk/image/upload/v1633521279/location%20previews/location-preview-8_yjbewa.png' }]
export function LocationsPopUp({ closeAllModals, onSetLocationPopUp }) {
    async function onPushTo(loc) {
        closeAllModals()
        onSetLocationPopUp(loc)
    }

    return (
        <div className="location-modal flex column">
            {locations.map((location, idx) => <div key={idx} className="location-card flex align-center" onClick={() => { onPushTo(location.city) }}>
                <img src={location.imgUrl} alt="location" className="loc-img" />
                <div className="flex column">
                    <p className="location-city">{location.city}</p>
                    <p className="location-country">{location.country}</p>
                </div>
            </div>
            )}
        </div>

    )
}
