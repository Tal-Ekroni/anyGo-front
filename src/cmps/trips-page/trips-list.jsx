import { TripPreview } from "./trip-preview";

export function TripsList({ trips, isHost, stays }) {

    return (
        <div className="trip-list flex">
            {trips.map((trip, idx) =>
                <TripPreview key={idx} trip={trip} />
            )}
        </div>)
}