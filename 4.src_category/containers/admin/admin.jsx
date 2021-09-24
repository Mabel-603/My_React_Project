import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect,Route,Switch} from 'react-router-dom'
import {Layout} from 'antd'
import {creteDeleteUserInfoAction} from '../../redux/action_creators/login-action'
import Header from './header/header'
import './css/admin.less'
import LeftNav from './left_nav/left_nav'
import Home from '../../components/home'
import Catagory from '../category/catagory'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
const {  Footer, Sider, Content } = Layout;


@ connect(
  state => ({userInfo:state.userInfo}),
  {deleteUserInfo:creteDeleteUserInfoAction}
  )

class Admin extends Component{
  componentDidMount(){
    // console.log(this.props);
    
  }
logout =()=>{
  this.props.deleteUserInfo();//不用重定向,页面会根据isLogin自动渲染
}
    render(){
      let {isLogin} = this.props.userInfo;
      //判断用户是否登录,
      if(!isLogin)  return <Redirect  to='/login'/>
      else{
        return(
          <Layout className="admin">
            <Sider className="sider">
              <LeftNav/>
            </Sider>
            <Layout>
              <Header className="header">Header</Header>
              <Content className="content">
               <Switch>
                 <Route path="/admin/home" component={Home} />
                 <Route path="/admin/prod_about/category" component={Catagory} />
                 <Route path="/admin/prod_about/product" component={Product} />
                 <Route path="/admin/user" component={User} />
                 <Route path="/admin/role" component={Role} />
                 <Route path="/admin/charts/bar" component={Bar} />
                 <Route path="/admin/charts/line" component={Line} />
                 <Route path="/admin/charts/pie" component={Pie} />
                 <Redirect to="/admin/home"/>
               </Switch>
              </Content>
              <Footer className="footer">
                推荐使用谷歌浏览器,获取最佳用户体验
              </Footer>
            </Layout>
          </Layout>
          )
      } 
      
    }
}
//从redux中获取状态和操作状态的方法
export default Admin