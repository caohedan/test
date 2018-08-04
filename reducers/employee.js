import * as types from '../constants/ActionTypes'
export default (state=[], action) => {
    switch (action.type) {
       case types.EMPLOYEELIST:{
            let newState = [...state]
            newState = action.employeesList
            return newState;
        }
        case types.ADDEMPLOYEE:{
            let newState = [...state,action.employeeItem]
            return newState;
        } 

        case types.ACCOUNTSTATUS:{
            let newState = [...state]
            newState.find(i=>i.id == action.employeeItem.id).account_status = action.employeeItem.account_status
            return newState;
        }
        case types.UPDATEEMPLOYEE:{
            let newState = [...state]
            return newState.map(i=>{
                if(i.id === action.employeeItem.id){
                    return action.employeeItem
                } else {
                    return i
                }
            }) 
        }
        case types.SEARCHEMPLOYEE:{
            console.log(action.employeesList)
            let newState = [...action.employeesList]
            return newState
        }
        default:
            return state
    }
}