import React, { Component } from 'react';
import { Table, Icon, Divider, Button, Menu, Dropdown, message, Input, Row, Col, Select } from 'antd'
import Edit from "./common/editComponent"

const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;

class ParkingLotMangement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowEditForm: false,
            isShowModifyForm: false,
            dataFormat: {},
            modifyId: 0,
            searchType: "",
        }
    }

    setSearchType = (e) => {
        this.setState({
            searchType: e,
        })
    }

    componentWillMount() {
        this.props.onGetAllParkingLots();
    }
    showModifyForm = (value, id, name, size) => {
        console.log(value)
        this.setState({
            isShowModifyForm: value,
            modifyId: id,
            dataFormat: { name, size }
        })
    }

    showEditForm = (value) => {
        this.setState({
            isShowEditForm: value,
        })
    }

    modifyForm = (value) => {
        this.props.onModifyParkinglot(this.state.modifyId, value)
    }

    submitForm = (value) => {
        this.props.onAddParkinglot(value)
    }
    render() {

        const data = this.props.parkinglotsList;
        const columns = [
            // { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'id', dataIndex: 'id', key: 'id', fixed: 'left' },
            { title: '名字', dataIndex: 'name', key: 'name' },
            { title: '大小', dataIndex: 'size', key: 'size' },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 200,
                render: (parkinglot) => (
                    <span>
                        <a href="javascript:;"
                            onClick={() => this.showModifyForm(true, parkinglot.id, parkinglot.name, parkinglot.size)} >修改</a>
                        <Divider type="vertical" />
                        <a href="javascript:;"
                            onClick={() => {
                                console.log(parkinglot.id);
                                this.props.changeStatus(parkinglot.id)
                            }}>
                            {parkinglot.status === "open" ? "注销" : "开放"}
                        </a>
                    </span>
                ),
            },
        ];

        const dataFormat = {
            "name": "",
            "size": "",
        }
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={6}>
                        <Button type="primary" onClick={() => this.showEditForm(true)}>新建</Button>
                    </Col>
                    <Col span={6}></Col>
                    <Col span={6} align="right">
                        <InputGroup compact>
                            <Select defaultValue="id" style={{ width: "100px" }} onChange={(e) => this.setSearchType(e)}>
                                <Option value="name">lot name</Option>
                                <Option value="tel">boy tel</Option>
                                <Option value="sizeBt">big than</Option>
                                <Option value="sizeSt">small than</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span={6}>
                        <Search
                            placeholder="示例文字"
                            enterButton="搜索"
                            // size="large"
                            onSearch={value => this.props.onSearch(value, this.state.searchType)}
                            style={{ width: 400 }}
                        />
                    </Col>
                </Row>
                <Table
                    bordered
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1300 }} />
                {this.state.isShowEditForm && <Edit dataFormat={dataFormat} showEditForm={(e) => this.showEditForm(e)} submitForm={(e) => this.submitForm(e)} />}
                {this.state.isShowModifyForm && <Edit dataFormat={this.state.dataFormat} showEditForm={(e) => this.showModifyForm(e)} submitForm={(e) => this.modifyForm(e)} />}
            </div>
        );
    }
}

export default ParkingLotMangement;