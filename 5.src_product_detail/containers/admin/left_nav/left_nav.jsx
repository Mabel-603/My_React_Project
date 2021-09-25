import React, { Component } from 'react'
import { Menu} from 'antd';
import {Link, withRouter} from "react-router-dom"
import {createSaveTitleAction} from '../../../redux/action_creators/menu_action'
import menuList from "../../../config/menu_config"
import logo from '../../../static/imgs/logo.png'
import  './left_nav.less'
import { connect } from 'react-redux';

const { SubMenu,Item } = Menu;
@connect(
  state=>({}),
  {
    saveTitle:createSaveTitleAction
  }
)
@withRouter
 class LeftNav extends Component {
   componentDidMount(){
    //  console.log(this.props.location.pathname);
   }
  createMenu = (target)=>{
    return target.map((item)=>{
      if(!item.children){
        return (
         <Item key={item.key} icon={item.icon} onClick={()=>{this.props.saveTitle(item.title)}}>
           <Link to={item.path}>
           {item.title}
           </Link>
          </Item>
        )
      }else{
        return(
         <SubMenu key={item.key} icon={item.icon} title={item.title}>
         {this.createMenu(item.children)}
       </SubMenu>
        )
      }
     })}
  render() {
    return (
          <div >
            <header className='nav-header'>
              <img src={logo} alt="logo图片" />
              <h1>商品管理系统</h1>
            </header>
        <Menu
          defaultSelectedKeys={this.props.location.pathname.indexOf('product') !== -1 ? 'product': this.props.location.pathname.split('/').reverse()[0]}
          defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
          mode="inline"
          theme="dark"
        >
        {this.createMenu(menuList)}
        </Menu>
      </div>
      
    )
  }
}
export default LeftNav
