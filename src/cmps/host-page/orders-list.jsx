import { OrderPreview } from "./order-preview";

export function OrdersList({ orders }) {
    return (
        <div className="order-list flex">
            {orders.map((order, idx) =>
                <OrderPreview key={idx} order={order} />
            )}
        </div>)
}