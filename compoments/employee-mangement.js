import React, { Component } from 'react';
import { Divider, Table, Button, Input, Select } from 'antd'
import Edit from "./common/editComponent"
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;
class employeeMangment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowEditForm: false,
            dataFormat: {},
            isModifyAdd: true,
            searchType: "id"
        }
    }
    componentWillMount() {
        this.props.onGetAllEmployees()
    }
    setSeachType = (e) => {
        this.setState({
            searchType: e
        })
    }

    showEditForm = (value, dataFormat, key) => {
        this.setState({
            isShowEditForm: value,
            dataFormat: dataFormat,
            isModifyAdd: key
        })
    }
    submitForm = (value) => {
        if (this.state.isModifyAdd) {
            this.props.onAddEmployee(value)
        } else {
            this.props.onUpdateEmployee(value)
        }
    }

    updateAccountStatus = (id) => {
        this.props.onChangeAccountSataus(id)
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
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '电话号码',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '操作',
            key: 'action',
            render: (e) => {
                const { id, email, name, password, phone, username } = e
                return <span >
                    <a href="javascript:;" onClick={
                        () => this.showEditForm(true, { id, email, name, password, phone, username }, false)
                    }>修改</a>
                    {id !== 1 &&
                        <span>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={
                                () => this.updateAccountStatus(id)
                            }>{e.account_status === "normal" ? "冻结" : "开放"}</a>
                        </span>
                    }

                </span>
            },
        }];

        const data = this.props.employeesList;

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <Button type="primary" onClick={() => this.showEditForm(true, {
                        "name": "",
                        "username": "",
                        "email": "",
                        "phone": ""
                    }, true)}>新增</Button>
                    <div style={{ display: "flex" }}>
                        <InputGroup compact>
                            <Select defaultValue="id" style={{ width: "100px" }} onChange={this.setSeachType}>
                                <Option value="id">id</Option>
                                <Option value="name">姓名</Option>
                                <Option value="email">email</Option>
                                <Option value="phone">电话号码</Option>
                            </Select>
                        </InputGroup>
                        <Search
                            style={{ width: 400 }}
                            placeholder="示例文字"
                            onSearch={value => this.props.onSearchEmployees({
                                searchType: this.state.searchType,
                                searchValue: value
                            })}
                            enterButton="搜索"
                        />
                    </div>
                </div>
                {data&&<Table bordered columns={columns} dataSource={data} scroll={{ x: 1300 }} />}
                {this.state.isShowEditForm && <Edit dataFormat={this.state.dataFormat} showEditForm={(e) => this.showEditForm(e)} submitForm={(e) => this.submitForm(e)} />}
            </div>
        );
    }
}

export default employeeMangment;