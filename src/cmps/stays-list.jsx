import { StayPreview } from "./stay-preview";

export function StaysList({ stays, history,onToggleLikedStay }) {
    return (
        <div className="stay-list">
            {stays.map((stay, idx) =>
                <StayPreview key={idx} stay={stay} history={history} onToggleLikedStay={onToggleLikedStay} />
            )}
        </div>)
}