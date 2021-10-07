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
  state=>({
   menus:state.userInfo.user.role.menus,
   username:state.userInfo.user.username
  }),
  {saveTitle:createSaveTitleAction}
)
@withRouter
 class LeftNav extends Component {
   componentDidMount(){
    //  console.log(this.props.location.pathname);
   }
   hasAuth = (item)=>{
     //获取当前用户可以看到的菜单的数组
     const {menus,username} = this.props  
     if(username === 'admin') return true
     else if(!item.children){
       return menus.find((item2)=>{return item2 === item.key})
     }else if(item.children){
       return item.children.some((item3)=>{return menus.indexOf(item3.key) !== -1})
     }
   }

  createMenu = (target)=>{//用于创建菜单的函数
    return target.map((item)=>{
    if(this.hasAuth(item)){//item可能是menulist中没有孩子的菜单,也可能是有孩子的菜单中的孩子
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
