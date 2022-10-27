const initialState = {
    orders: [],
    order: null
}
export function orderReducer(state = initialState, action) {
    var newState = state
    var orders
    switch (action.type) {
        case 'SET_ORDERS':
            newState = { ...state, orders: action.orders }
            break
        case 'SET_ORDER':
            newState = { ...state, order: action.order }
            break
        case 'REMOVE_ORDER':
            const lastRemovedOrder = state.orders.find(order => order._id === action.orderId)
            orders = state.orders.filter(order => order._id !== action.orderId)
            newState = { ...state, orders, lastRemovedOrder }
            break
        case 'ADD_ORDER':
            newState = { ...state, orders: [...state.orders, action.order] }
            break
        case 'UPDATE_ORDER':
            orders = state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            newState = { ...state, orders, order: action.order }
            break
        default:
            break;
    }

    // For debug:
    window.orderState = newState

    return newState

}
