import * as types from '../constants/ActionTypes'
export default (state=[], action) => {
    switch (action.type) {
        case types.PARKINGLOTLISTINDASHBOARD:{
            let newState = [...action.parkinglotsListInDashboard] 
            return newState;
        }
        default:
            return state
    }
}