import React, { Component } from 'react';
import { Divider, Table, Button, Input, Select, Transfer ,Tag} from 'antd'
import Edit from "./common/editComponent"
import * as types from '../constants/ActionTypes'
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;
class parkingBoy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowEditForm: false,
            dataFormat: {},
            parkinglots:[],
            filterList:[],
            searchType: "id",
            tags:[],
            parkingBoys:this.props.parkingboyList,
        }
    }
    componentWillMount() {
        this.props.onGetAllParkingboys();
        this.props.onGetAllParkinglots();
        this.setState({
            parkinglots: this.props.parkinglots,
        })
        console.log(this.state.parkinglots)
    }

    filterOption = (inputValue, option) => {
    // console.log("++++++++"+JSON.stringify(inputValue))
    return option.description.indexOf(inputValue) > -1;
}

handleChange = (nextTargetKeys, direction, moveKeys, id) => {
    // console.log('targetKeys: ', nextTargetKeys);
    // console.log('direction: ', direction);
    // console.log('moveKeys: ', moveKeys);
    if(direction === "right"){
        this.props.onAssignParkinglot(id, moveKeys);
        this.props.onGetAllParkingboys();
        this.props.onGetAllParkinglots();
    }else{

    }
}
setSeachType = (e) => {
    this.setState({
        searchType: e
    })
}
onSearchBoys = (e) =>{
    let temp = this.state.filterList.concat();
    let flag = true;
    for(let i =0 ;i<temp.length;i++){
        if(temp[i].searchType === e.searchType)
        {
            temp[i].searchValue = e.searchValue;
            flag = false;
            break;
        }
    }
    if(flag)
    {
        temp.push(e);
    }
    this.showTags(temp);
}
showTags = (list)=>{
    let tags = [];
    let parkingBoys = this.props.parkingboyList;
    let type ;
    for(let i=0;i<list.length;i++){
        parkingBoys =this.findTypeAndBoys(list[i].searchType,list[i].searchValue,parkingBoys).parkingBoys;
        type = this.findTypeAndBoys(list[i].searchType,list[i].searchValue).type;
        tags.push(<Tag closable afterClose = {(e)=> this.deleteKeyWord(e,list[i])} key = {i}>{type}:{list[i].searchValue}</Tag>);
    }

    this.setState({
        filterList:list,tags,parkingBoys
    })

}
deleteKeyWord = (e,key)=> {
    console.log(this.state.filterList.concat())
    console.log(key)
    let filterList = this.state.filterList.filter(x=> !(x == key))
    let type;
    let parkingBoys = this.props.parkingboyList;
    let tags = [];
    for (let i = 0; i < filterList.length; i++) {
        parkingBoys = this.findTypeAndBoys(filterList[i].searchType, filterList[i].searchValue,parkingBoys).parkingBoys;
        type = this.findTypeAndBoys(filterList[i].searchType,filterList[i].searchValue).type;
    }
    console.log(this);
    console.log(filterList);
    console.log(tags);
    console.log(parkingBoys);
    this.setState({filterList,parkingBoys,tags})
    console.log(this.state)
}

findTypeAndBoys = (searchType,searchValue,parkingBoys)=>{


  //  let parkingBoys = this.state.parkingboyList;
    let type;
    if(searchType === "id")
    {
        type = types.id;
        parkingBoys = this.state.parkingBoys.filter(x=>x.id == searchValue);
    }
    else if(searchType === "name")
    {
        type = types.name;
        parkingBoys = this.state.parkingBoys.filter(x=>x.name === searchValue);
    }
    else  if(searchType === "phone"){
        parkingBoys = this.state.parkingBoys.filter(x=>x.phone === searchValue);
        type = types.phone;
    }

    return {
        "type":type,
        "parkingBoys":parkingBoys
    }

}
generateTransfer = (e) => {
    console.log(e)
    console.log(this.props.parkinglots)
    const parkinglotData = this.props.parkinglots.filter( lot=>
        (lot.status === "open" && (lot.userId == null || lot.userId === e.id))
).map(lot=>{
        return {...lot,
        key: lot.id}
})
    console.log(parkinglotData)
    const targetKeys = parkinglotData.filter(lot=>
        lot.userId === e.id
).map(lot=>lot.key)
    console.log(targetKeys)
    return (
        <Transfer
    dataSource={parkinglotData}//数据源，其中的数据会被渲染到左侧一栏
    showSearch//显示搜索框
    listStyle={{
        width: 250,
            height: 300,
    }}
    searchPlaceholder='请输入搜索内容'
    titles={['可选停车场', '管理的停车场']}
    filterOption={this.filterOption}
    targetKeys={targetKeys}//显示在右侧框数据的key集合
    onChange={(nextTargetKeys, direction, moveKeys)=>this.handleChange(nextTargetKeys, direction, moveKeys, e.id)}//选项在两栏之间转移时的回调函数
    render={item => item.name}
    />)
}


showEditForm = (value, dataFormat) => {
    this.setState({
        isShowEditForm: value,
        dataFormat,
    })
}
submitForm = (value) => {
    this.props.onUpdateEmployee(value)
}
render() {
    const columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <p>{text}</p>,
}, {
        title: "姓名",
            dataIndex: 'name',
            key: 'name',
    }, {
        title: '电话号码',
            dataIndex: 'phone',
            key: 'phone',
    }, {
        title: '状态',
            dataIndex: 'status',
            key: 'status',
    }, {
        title: '操作',
            key: 'action',
            render: (e) => {
            const { id, email, name, password, phone } = e
            return <span >
            <a href="javascript:;" onClick={
            () => this.showEditForm(true, { id, email, name, password, phone })
        }>修改</a>
            <Divider type="vertical" />
                <a href="javascript:;" onClick={
            () => this.props.onChangeAccountSataus(id)}>
            {e.account_status === "normal" ? "冻结" : "开放"}</a>
            </span>
        },
    }];

    // const data = this.props.parkingboyList;


    return (
        <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
<div style={{ display: "flex" }}>
<InputGroup compact>
    <Select defaultValue="id" style={{ width: 120 }} onChange={this.setSeachType}>
<Option value="id">id</Option>
        <Option value="name">姓名</Option>
        <Option value="phone">电话号码</Option>
        </Select>
        </InputGroup>
        <Search
    style={{ width: 400 }}
    placeholder="示例文字"
    onSearch={value => this.onSearchBoys({
        searchType: this.state.searchType,
        searchValue: value
    })}
    enterButton="搜索"
        />
        {this.state.tags}
</div>
    </div>
    <Table columns={columns}
    bordered
    // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
    expandedRowRender={this.generateTransfer}
    dataSource={this.state.parkingBoys} scroll={{ x: 1300 }} />
    {this.state.isShowEditForm && <Edit dataFormat={this.state.dataFormat} showEditForm={(e) => this.showEditForm(e)} submitForm={(e) => this.submitForm(e)} />}
    </div>
    );
}
}

export default parkingBoy;
