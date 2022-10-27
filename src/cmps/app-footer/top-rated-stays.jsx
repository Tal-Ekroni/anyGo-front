import { Link } from "react-router-dom"

export function TopRatedStays({ stays}) {
    return (
        <section className="flex column top-rated-stays ">
            <h4>Top rated stays</h4>
            {
                stays.map(stay =>
                    
                    <div  key={stay._id} className="flex column stay-links">
                        <Link to={`/stay/${stay._id}`}>{stay.name}</Link>
                    </div>
                )
            }
        </section>
    )
}