import React, {Component} from 'react';
import {useState} from 'react'
import ReactDOM from 'react-dom';
import './App.css';


//import { ConfigProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
//import zhCN from 'antd/es/locale/zh_CN';
//import moment from 'moment';
//import 'moment/locale/zh-cn';

//import { Button } from 'antd';
import { Tabs } from 'antd';
import { Layout } from 'antd';
import { Card } from 'antd';

//import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';


//import StickyFooter from 'react-sticky-footer';
//import Visualization from 'coronavirus-visualization/viz.js'


import BarChart from './component/BarChart'
//import Tree from './component/Tree'
//import Heatmap from './component/Heatmap'
import Phylogeny from './component/Phylogeny'
import MyHeader from './component/MyHeader'
import MyFooter from './component/MyFooter'
import ChinaMap from './component/ChinaMap'
import WorldMap from './component/WorldMap'

import Haplotype from './component/Haplotype'

import TreeMutation from './component/TreeMutation.js'


//moment.locale('zh-cn');



class App extends Component {


  /**<div>
   <Tree data={this.state.data} width={this.state.width} height={this.state.height} />
   </div>
   <div className="App">
   <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
   </div>**/


  /**<StickyFooter
   bottomThreshold={50}
   normalStyles={{
    backgroundColor: "#999999",
    padding: "2rem"
    }}
   stickyStyles={{
    backgroundColor: "rgba(255,255,255,.8)",
    padding: "2rem"
    }}
   >
   Add any footer markup here
   </StickyFooter>**/

  /*function App() {
   return (
   <div className="App">
   <header className="App-header">
   <img src={logo} className="App-logo" alt="logo" />
   <p>
   Edit <code>src/App.js</code> and save to reload.
   </p>
   <a
   className="App-link"
   href="https://reactjs.org"
   target="_blank"
   rel="noopener noreferrer"
   >
   Learn React
   </a>
   </header>
   </div>
   );
   }*/

  state1 = {
    data: [12, 5, 6, 6, 9, 10],
    width: 300,
    height: 200,
    id: 'root'
  }

    state2 = {
        province: ''
    }


  /**<BarChart data={this.state1.data} width={this.state1.width} height={this.state1.height}/>**/

  render () {

    //const [province, _setProvince] = useState(null)
    const { Header, Footer, Sider, Content } = Layout;
    const { TabPane } = Tabs;

    const province = this.state2.province

        //<Button type="primary">Button</Button>

        /*<h3> { province ? `· ${province.name}` : false }
      {
          province ? <small
              onClick={() => this.state.country = "China"}
              >返回</small> :  <small
              onClick={() => this.state.country = "China"}
              >返回</small>
      }
      </h3>*/

        /*<Card title="疫情地图">
          <WorldMap country={this.state.country} onClick={() => this.state.country = "China"}/>
          </Card>*/

      return (
          <div>
              <MyHeader province={this.state2.province}/>

                          <div className="card"/>
                          <h2>病例报告 { province ? `· ${province.name}` : false }</h2>

                          <Tabs type="primary" defaultActiveKey="1">
                              <TabPane
                                  tab={
                        <span>
                                 <span> &nbsp;&nbsp;</span><span>全球</span>
                        </span>

                      }
                                  key="1">


                                  <WorldMap/>

                              </TabPane>

                              <TabPane
                                  tab={
                        <span>
                                   国内
                        </span>
                      }
                                  key="2">
                                  <ChinaMap/>
                              </TabPane>
                          </Tabs>,

                          <div className="card"/>

                          <h2>进化变异 { province ? `· ${province.name}` : false }</h2>

              <TreeMutation/>

                          <div className="card"/>
                          <h2>单倍型 { province ? `· ${province.name}` : false }</h2>
              <Haplotype/>

              <div className="card"/>
              <h2>传播动态 { province ? `· ${province.name}` : false }</h2>
                  <p><big>To be continued.</big></p>

                  <MyFooter />
          </div>
      );
    }
}

//<div className="card"/>
//<h2>传播动态 { province ? `· ${province.name}` : false }</h2>
//    <p><big>To be continued.</big></p>


// <Haplotype/>
//<Haplotype data={this.state1.data} width={this.state1.width} height={this.state1.height} />

export default App;
