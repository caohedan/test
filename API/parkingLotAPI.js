import axios from "axios"
import * as actions from '../actions'
import requestUrls from "./requestUrls"
axios.defaults.headers.common['authorization'] = localStorage.getItem("access_token");
export default {
    "getAllEmployees": (dispatch) =>{
        axios.defaults.headers.common['authorization'] = localStorage.getItem("access_token");
        axios.get(requestUrls.employees)
            .then((res) => {
                dispatch(actions.allEmployees(res.data))
            })
            .catch((error) => {
                console.log(error);
            })
    },
    "getAllParkingboys": (dispatch) => axios.get(`${requestUrls.employees}?role=parkingboy`)
        .then((res) => {
            dispatch(actions.allEmployees(res.data))
        })
        .catch((error) => {
            console.log(error);
        }),
    "getAllParkingLots": (dispatch) => 
        axios.get(requestUrls.parkingLots)
        .then((res) => {
            console.log("------"+JSON.stringify(res.data))
            dispatch(actions.allParkingLots(res.data))
        })
        .catch((error) => {
            console.log(error);
        }),

    "getNoUserParkinglots": (dispatch)=> axios.get(requestUrls.parkingLots+"/noUser")
        .then(res=>{
            dispatch(actions.allParkingLots(res.data))
        })
        .catch(error => {
            console.log(error)
        }),

    "changeParkingLotStatus": (id, dispatch) =>
        axios.patch(`${requestUrls.parkingLots}/${id}`)
            .then(res => {
                if (res.status == 204) {
                    // getAllParkingLots(dispatch);
                    axios.get(requestUrls.parkingLots)
                        .then((res) => {
                            console.log(res.data);
                            dispatch(actions.allParkingLots(res.data))
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                console.log(error)
            }),
    "addEmployee": (dispatch, postData) =>
        axios.post(requestUrls.employees, postData)
            .then((res) => {
                // console.log(res.data);
                dispatch(actions.addEmployee(res.data))
            })
            .catch((error) => {
                console.log(error);
            }),
    "addParkinglot": (dispatch, postData) =>
        axios.post(requestUrls.parkingLots, postData)
            .then(res => {
                // console.log(res.data);
                dispatch(actions.addParkinglot(res.data));
            })
            .catch(error => {
                console.log(error);
            }),

    "modifyParkinglot": (id, value, dispatch) =>
        axios.put(`${requestUrls.parkingLots}/${id}`, value)
            .then(res => {
                // console.log("-------"+JSON.stringify(res.data));
                dispatch(actions.modifyParkinglot(res.data))
                // console.log("-----ok")
            })
            .catch(error => {
                //console.log(error)
            }),

    "frozenAccount": (dispatch, id) => axios.patch(requestUrls.employees + "/" + id, {account_status: ""})
        .then(res => {
            dispatch(actions.handleAccountStatus(res.data));
        })
        .catch(error => {
            console.log(error);
        }),

    "getAllOrders": (dispatch) => axios.get(requestUrls.orders)
        .then((res) => {
            dispatch(actions.allOrders(res.data))
        })
        .catch((error) => {
            console.log(error);
        }),
    "getAllParkingLotsInDashboard": (dispatch) => 
        axios.get(requestUrls.parkingLotsDashboard)
        .then((res) => {
            console.log(res.data)
            dispatch(actions.allParkingLotsInDashboard(res.data))
        })
        .catch((error) => {
            console.log(error);
        }),
    "updateEmployee": (dispatch, employee) => axios.patch(requestUrls.employees + "/" + employee.id, employee)
        .then((res) => {
            dispatch(actions.updateEmployee(res.data))
        })
        .catch((error) => {
            console.log(error);
        }),
    "searchEmployees": (dispatch, searchValue) => axios.get(requestUrls.employees + "/search?" + searchValue.searchType + "=" + searchValue.searchValue + "")
        .then((res) => {
            dispatch(actions.searchEmployees(res.data))
        })
        .catch((error) => {
            console.log(error);
        }),

    "searchParkinglot": (value, searchType, dispatch) => {
        let search = `?${searchType}=${value}`;
        axios.get(requestUrls.parkingLotCombineSearch + search)
            .then(res => {
                console.log(res);
                dispatch(actions.allParkingLots(res.data));
            })
            .catch(error => {
                console.log(error);
            });
    },

    "assignParkinglot":(dispatch,userId, ids)=>{
        let path = `${requestUrls.employees}/${userId}/parkinglots/`
        ids.map(id=>{
            axios.patch(`${path}${id}`)
            .then(res=>{
                console.log(res)
                return true;
            })
            .catch(error=>{
                console.log(error)
                return false;
            })
        }).filter(state=>!state)

        axios.get(`${requestUrls.employees}/id=${userId}`)
        .then(res=>{
            dispatch(actions.updateEmployee(res.data))
        })
        .catch(error=>{
            console.log(error)
        })

    }

}