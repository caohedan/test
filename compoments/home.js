import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Router from "../Router";
import Tabbars from "./tabbars";
import { Avatar, Layout, Icon, Menu, Dropdown, message, Popconfirm } from 'antd';
const { Header, Content, Footer } = Layout;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
  }
  confirm = () => {
    const { history } = this.props
    localStorage.removeItem("access_token")
    history.push("/login")
    message.info('退出登录成功');
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const onClick = function ({ key }) {
    };
    const menu = (
      <Menu onClick={onClick}>

        <Menu.Item key="1">
          <Popconfirm placement="topLeft" title="你确定要退出登录么？" onConfirm={this.confirm} okText="Yes" cancelText="No">
            login out
      </Popconfirm>

        </Menu.Item>

      </Menu>
    );
    return (
      <Layout className="layout">
        <Tabbars collapsed={this.state.collapsed} />

        <Layout style={{ Width: "100%" }}>
          <Header style={{ background: '#fff', padding: 0 }} className="Header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Dropdown overlay={menu} className="Dropdown">
              <Avatar size="large" icon="user" />
            </Dropdown>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, minWidth: "100%" }}>
            <Router />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Parking System ©2018 Created by Oops
    </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;