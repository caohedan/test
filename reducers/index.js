import { combineReducers } from 'redux'
import employeeReducers from "./employee"
import parkingLotReducers from "./parkinglot"
import orderReducers from "./order"
import parkingLotInDashboardReducers from "./parkinglotInDashboard"
const parkingLotApp = combineReducers({
    employeeReducers,
    parkingLotReducers,
    orderReducers,
    parkingLotInDashboardReducers
  })
  export default parkingLotApp