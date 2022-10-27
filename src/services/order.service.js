import { httpService } from './http.service.js'
const listeners = []

export const orderService = {
    query,
    getById,
    save,
    update,
    remove,
    subscribe

}
window.cs = orderService;

async function query(userId, type) {
    // add userId and type to parameters in query
    const orders = await httpService.get('order', { params: { userId, type } })
    return orders
}
async function getById(orderId) {
    // return storageService.get(STORAGE_KEY, orderId)
    const order = await httpService.get(`order/${orderId}`)
    return order
}
function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}

function save(order) {
    const savedOrder = httpService.post('order', order)
    return savedOrder
}
async function update(order) {
    const UpdatedOrder = await httpService.put(`order/${order._id}`, order)
    return UpdatedOrder;
}

function subscribe(listener) {
    listeners.push(listener)
}

function _notifySubscribersOrdersChanged(orders) {
    listeners.forEach(listener => listener(orders))
}

window.addEventListener('storage', () => {
    query()
        .then(orders => {
            _notifySubscribersOrdersChanged(orders)
        })
})



