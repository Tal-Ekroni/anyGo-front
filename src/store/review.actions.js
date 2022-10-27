// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'

import { stayService } from '../services/stay.service'


// export function loadReviews() {
//   return async dispatch => {
//     try {
//       const reviews = await reviewService.query()
//       dispatch({ type: 'SET_REVIEWS', reviews })
//       // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) =>{
//       //   dispatch({ type: 'ADD_REVIEW', review })
//       // })

//     } catch (err) {

//     }
//   }
// }

export function onAddReview(review, stayId) {
  return async dispatch => {
    try {

      const currStay = await stayService.getById(stayId)
       currStay.reviews.unshift(review)
      const updatedStay = await stayService.update(currStay)
      dispatch({
        type: 'UPDATE_STAY',
        stay: updatedStay
      })

    } catch (err) {

    }
  }
}

// export function removeReview(reviewId) {
//   return async dispatch => {
//     try {
//       await reviewService.remove(reviewId)
//       dispatch({ type: 'REMOVE_REVIEW', reviewId })
//     } catch (err) {

//     }
//   }
// }
