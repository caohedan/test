import React, { Component } from 'react';
import { Collapse } from 'antd';
import { Progress ,Row,Col,Pagination } from 'antd';
const Panel = Collapse.Panel;
class Dashboarsh extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount() {
        this.props.onGetAllParkingLotsInDashboard()
    }
    render() {
        const items = this.props.parkinglotsListInDashboard;
        console.log(items)
        return (
            <div >
             <Row type="flex" justify="start">
                 {items.map(item=>{
                    //  return <li>{item.id}{item.name}{item.size}{item.countOfCars}</li>
                    console.log(item)
                    return <Col span={8} style={{marginBottom:"15px"}}>   
                            <div style={{width:"350px"}}>
                                <Collapse defaultActiveKey={['1']} >
                                <Panel showArrow={false} header={item.name} key="1">  
                                <Row type="flex" justify="space-around" align="middle">
                                    <Progress type="circle" percent={item.countOfCars} width={80} format={percent=>`${percent} /${item.size}`} />
                                    <span>停车员：{item.userName}</span>   
                                </Row>
                                <p style={{marginLeft:"45px"}}>停车场情况</p>
                                </Panel>
                                </Collapse>   
                            </div>
                        </Col>    
                 })} 
            </Row>
            {/* <Pagination defaultCurrent={1} total={50} /> */}
            </div>
        );
    }
}

export default Dashboarsh;