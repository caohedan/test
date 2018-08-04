import * as types from '../constants/ActionTypes'
export default (state=[], action) => {
    switch (action.type) {
       case types.ORDERSLIST:{
            let newState = [...state]
            newState = action.ordersList
            return newState;
        }
        default:
            return state
    }
}