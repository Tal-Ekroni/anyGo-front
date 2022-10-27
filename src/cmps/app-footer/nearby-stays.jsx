import { Link } from "react-router-dom"

export function NearbyStays({ stays }) {
    return <div className='flex column nearby-stays'>
        <h4>Nearby</h4>
        {stays.map(stay => <Link key={stay._id} to={`/stay/${stay._id}`}>{stay.name}</Link>)}
    </div>
}