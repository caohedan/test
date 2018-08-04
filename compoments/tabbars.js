import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
class Tabbars extends Component {
    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/home/employeeMangment">
                            <Icon type="user" />
                            <span>员工管理</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Link to="/home/parkingLotMangement">
                            <Icon type="car" />
                            <span>停车场管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/home/parkingBoy">
                            <Icon type="contacts" />
                            <span>停车员管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/home/dashboarsh">
                            {/* <Icon type="codepen-circle" /> */}
                            <Icon type="dashboard" />
                            <span>停车场Dashboard</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="/home/orderManagement">
                            <Icon type="form" />
                            <span>订单管理</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default Tabbars;