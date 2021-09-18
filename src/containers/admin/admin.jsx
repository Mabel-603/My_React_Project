import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {creteDeleteUserInfoAction} from '../../redux/action_creators/login-action'

@ connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:creteDeleteUserInfoAction
  })

class Admin extends Component{
  componentDidMount(){
    console.log(this.props);
  }
logout =()=>{
  this.props.deleteUserInfo();//不用重定向,页面会根据isLogin自动渲染
}
    render(){
      let {isLogin,user} = this.props.userInfo;
      if(!isLogin){
      return <Redirect  to='/login'/>
      }else{
        return(
          <div>
            我是Admin组件,你的名字是{user.username}
            <button onClick={this.logout}> 退出登录 </button>
          </div>
          )
      } 
      
    }
}
//从redux中获取状态和操作状态的方法
export default Admin