import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,Row ,Col,message} from 'antd';
import '../css/LoginForm.css'
import axios from "axios"
import requestUrls from "../API/requestUrls"
const FormItem = Form.Item;

class NormalLoginForm extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let postData={"username":values.userName,"password":values.password}
            axios.post(requestUrls.login,postData)//.employees
                  .then((res) => {
                    console.log(res)
                    if(res.status===200){
                        message.info('登录成功');
                        localStorage.setItem("access_token", res.data.token);

                        const {history}=this.props;
                        history.push("/home/employeeMangment/"+res.data.id)
                    } else {
                        message.info('未知异常！');
                    }
                })
                .catch((error) => {
                  message.info('账号或密码错误！');
                })
          }
        });
      }
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Row type="flex" justify="space-around" align="center">
          <Col span={5}>
          <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form">
            <h1>请先登录</h1>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
          </Form>
          </Col>
          </Row>
        );
      }
}
const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm