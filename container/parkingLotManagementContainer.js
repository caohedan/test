import { connect } from 'react-redux'
import ParkingLotMangement from "../compoments/parkingLot-management"
import Api from "../API/parkingLotAPI"
const mapStateToProps = (state, ownProps) => {
    return {
        parkinglotsList: state.parkingLotReducers
    }

}
const mapDispatchToProps = (dispatch, ownProps) => {
   
    return {
        onGetAllParkingLots:()=>{
            Api.getAllParkingLots(dispatch)
        },

        changeStatus:(id)=>{
            Api.changeParkingLotStatus(id, dispatch)
        },

        onAddParkinglot:(value)=>{
            Api.addParkinglot(dispatch, value);
        },

        onModifyParkinglot:(id, value)=>{
            Api.modifyParkinglot(id, value, dispatch);
        },

        onSearch:(value, searchType)=>{
            Api.searchParkinglot(value, searchType, dispatch);
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotMangement)