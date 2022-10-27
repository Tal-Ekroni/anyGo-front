import { httpService } from './http.service.js'

const listeners = []

export const stayService = {
    query,
    getById,
    save,
    remove,
    subscribe,
    update,
    filterPageStays
}
window.cs = stayService;

async function query(filterBy = {}) {
    const stays = await httpService.get('stay', { params: filterBy })
    return stays
}
async function getById(stayId) {
    const stay = await httpService.get(`stay/${stayId}`)
    return stay
}
function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    return httpService.post('stay', stay)

}
async function update(stay) {
    const UpdatedStay = await httpService.put(`stay/${stay._id}`, stay)
    return UpdatedStay;
}


function filterPageStays(filterBy, stays) {
    var filterdStays = stays
    // if (!Object.values(filterBy.amenities).includes(true)) {
    //     filterdStays = stays
    // } else {

    //     filterdStays = filterdStays.filter(stay => {
    //     })
    // }
    if (filterBy.amenities.length) {
        filterdStays = filterdStays.filter(stay => {
            let isStay = true
            filterBy.amenities.forEach(amenity => {
                if (!stay.amenities.includes(amenity)) isStay = false
            })
            return isStay
        })
    }

    if (filterBy.placeType) {
        filterdStays = filterdStays.filter(stay => stay.assetType.split(' ')[0] === filterBy.placeType.split(' ')[0])
    }
    if (filterBy.PropertyType) {
        filterdStays = filterdStays.filter(stay => stay.assetType.toLowerCase().split(' ')[1] === filterBy.PropertyType.toLowerCase())
    }
    filterdStays = filterdStays.filter(stay => stay.price >= filterBy.priceRange[0] && stay.price <= filterBy.priceRange[1])
    return filterdStays
}
function subscribe(listener) {
    listeners.push(listener)
}

function _notifySubscribersStaysChanged(stays) {
    listeners.forEach(listener => listener(stays))
}

window.addEventListener('storage', () => {
    query()
        .then(stays => {
            _notifySubscribersStaysChanged(stays)
        })
})






