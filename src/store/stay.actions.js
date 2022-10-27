import { stayService } from "../services/stay.service.js";
import { userService } from "../services/user.service.js";
export function loadStays(filterBy = null) {
    return async (dispatch) => {
        try {
            const stays = await stayService.query(filterBy)
            dispatch({
                type: 'SET_STAYS',
                stays
            })
        } catch (err) {
        }
    }
}

export function loadStay(stayId) {
    return async dispatch => {
        try {
            if (stayId) {
                dispatch({ type: 'LOADING_START' })
                const stay = await stayService.getById(stayId)
                dispatch({ type: 'SET_STAY', stay })
            } else {
                const clearStay = null
                dispatch({ type: 'SET_STAY', stay: clearStay })
            }
        } catch (err) {

        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function onRemoveStay(stayId) {
    return async (dispatch, getState) => {
        try {
            await stayService.remove(stayId)
            dispatch({
                type: 'REMOVE_STAY',
                stayId
            })
        } catch (err) {
        }
    }
}

export function onAddStay(stayToAdd) {
    return async (dispatch) => {
        try {
            const savedStay = await stayService.save(stayToAdd)

            dispatch({
                type: 'ADD_STAY',
                stay: savedStay
            })
        }
        catch (err) {
        }
    }
}

export function setFilter(filterBy) {
    return async (dispatch) => {
        try {
            await dispatch({
                type: 'SET_FILTER',
                filter: filterBy
            })
        } catch (err) {

        }
    }
}
export function setMiniHeader(isMiniHeader) {
    return async (dispatch, getState) => {
        try {
            await dispatch({
                type: 'SET_HEADER',
                isMiniHeader
            })
        } catch (err) {

        }
    }
}
export function onEditStay(stayToSave) {

    return async (dispatch) => {
        try {
            const updatedStay = await stayService.update(stayToSave)
            console.log('after send', updatedStay);

            dispatch({
                type: 'UPDATE_STAY',
                stay: updatedStay
            })
        } catch (err) {
        }
    }

}

export function removeFromCart(carId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            carId
        })
    }
}

export function checkout() {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.stayModule.cart.reduce((acc, stay) => acc + stay.price, 0)
            dispatch({ type: 'CLEAR_CART' })
        } catch (err) {
        }
    }
}
