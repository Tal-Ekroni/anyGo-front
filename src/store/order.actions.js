import { orderService } from "../services/order.service.js";
import { userService } from "../services/user.service.js";
import { socketService } from "../services/socket.service.js";

export function loadOrders(userId, type) {
    return async (dispatch) => {
        try {
            const orders = await orderService.query(userId, type)
            dispatch({
                type: 'SET_ORDERS',
                orders
            })
        } catch (err) {
        }
    }
}
export function loadOrder(orderId) {
    return async (dispatch) => {
        try {
            const order = await orderService.getById(orderId)
            dispatch({
                type: 'SET_ORDER',
                order
            })
        } catch (err) {
        }
    }
}

export function onRemoveOrder(orderId) {
    return async (dispatch, getState) => {
        try {
            await orderService.remove(orderId)
            dispatch({
                type: 'REMOVE_ORDER',
                orderId
            })
        } catch (err) {

        }
    }
}

export function onAddOrder(orderToAdd) {
    const { buyer } = orderToAdd

    return async (dispatch) => {
        try {
            const notif = {
                byUser: { fullName: buyer.fullname, imgUrl: buyer.imgUrl, _id: buyer._id },
                createdAt: Date.now(),
                stay: { _id: orderToAdd.stay._id, name: orderToAdd.loc.address, reviewsAvg: orderToAdd.stay.reviewsAvg },
                txt: `Reserved your stay`,
                isRead: false
            }
            const savedOrder = await orderService.save(orderToAdd)
            dispatch({ type: 'ADD_ORDER', order: savedOrder })
            socketService.emit('setNotif', notif)
        }
        catch (err) {

        }
    }
}
export function onCancelOrder(tripId, buyerId, hostId) {
    return async (dispatch) => {
        try {

            const buyer = await userService.getById(buyerId)
            const hostUser = await userService.getById(hostId)
            buyer.myTrips = buyer.myTrips.filter(trip => { return trip._id !== tripId })
            hostUser.orders = hostUser.orders.filter(trip => { return trip._id !== tripId })
            const updatedUser = await userService.update(buyer)
            const updatedHost = await userService.update(hostUser)
            dispatch({ type: 'UPDATE_USER', user: updatedUser })
            dispatch({ type: 'UPDATE_USER', user: updatedHost })

        }
        catch (err) {
        }
    }
}
export function onApproveOrder(order) {
    return async (dispatch) => {
        try {
            const updatedOrder = await orderService.update(order)
            dispatch({ type: 'UPDATE_ORDER', order: updatedOrder })


        }
        catch (err) {
        }
    }
}
export function onUpdateOrder(order) {
    return async (dispatch) => {
        try {
            const updatedOrder = await orderService.update(order)
            dispatch({ type: 'UPDATE_ORDER', order: updatedOrder })


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
export function onEditOrder(orderToSave) {
    return async (dispatch) => {
        try {
            const updatedOrder = await orderService.update(orderToSave)
            dispatch({
                type: 'UPDATE_ORDER',
                order: updatedOrder
            })

        } catch (err) {
        }
    }
}
export function checkout() {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.orderModule.cart.reduce((acc, order) => acc + order.price, 0)
            const score = await userService.changeScore(-total)
            dispatch({ type: 'SET_SCORE', score })
            dispatch({ type: 'CLEAR_CART' })
        } catch (err) {
        }
    }
}

