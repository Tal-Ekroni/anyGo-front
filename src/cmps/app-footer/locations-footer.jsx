const locations = [{ city: 'Porto', country: 'Portugal' }, { city: 'Barcelona', country: 'Spain' }, { city: 'Tel Aviv', country: 'Israel' }, { city: 'Paris', country: "France" }, { city: 'London', country: 'United Kingdom' }, { city: 'New York', country: 'United States' }, { city: 'Amsterdam', country: 'Netherlands' }, { city: 'Rome', country: 'Italy' }]
export function FooterLocations({onClickLoc}) {
    return (
        <div className='flex column footer-locations'>
            <h4>Locations</h4>
            {
                locations.map((loc,idx) =><p key={idx} onClick={()=>onClickLoc(loc.city,'location')}>{loc.city},{loc.country}</p>)
            }
        </div>
    )
}