const initialState = {
    stays: [],
    bookedTrip: null,
    stay: null,
    review: null,
    lastRemovedStay: null,
    isMiniHeader: true,
    filterBy: {
        startDate: null,
        endDate: null,
        location: '',
        adultNumber: 0,
        kidsNumber: 0,
        infantsNumber: 0,
        capacity: 0,
        amenities: '',
        assetType: '',
        uniqueStay: '',
        guestModal: false,
        datesModal: false,
        hostId: ''
    }
}
export function stayReducer(state = initialState, action) {
    var newState = state
    var stays
    var cart
    switch (action.type) {
        case 'SET_STAYS':
            newState = { ...state, stays: action.stays }
            break
        case 'SET_STAY':
            newState = { ...state, stay: action.stay }
            break
        case 'REMOVE_STAY':
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays, lastRemovedStay }
            break
        case 'ADD_STAY':
            newState = { ...state, stays: [...state.stays, action.stay] }
            break
        case 'SET_HEADER':
            newState = { ...state, isMiniHeader: action.isMiniHeader }
            break
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...action.filter } }
            break;
        case 'UPDATE_STAY':
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays, stay: action.stay }
            break

        case 'REMOVE_FROM_CART':
            cart = state.cart.filter(stay => stay._id !== action.stayId)
            newState = { ...state, cart }
            break
        case 'CLEAR_CART':
            newState = { ...state, cart: [] }
            break
        case 'UNDO_REMOVE_STAY':
            if (state.lastRemovedStay) {
                newState = { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
            }
            break
        default:
    }
    // For debug:
    window.stayState = newState

    return newState

}
