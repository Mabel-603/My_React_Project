import React,{Component} from 'react'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import screenfull from 'screenfull'
import {creteDeleteUserInfoAction} from '../../../redux/action_creators/login-action'
import dayjs from 'dayjs'
import './header.less'

const {confirm} = Modal;

@connect(
  state=>({userInfo:state.userInfo}),
  {deleteUser:creteDeleteUserInfoAction}
)
@withRouter
class Header extends Component{
  state={
    isFull:false,
    date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    // weatherInfo:{}
  }
  // getWeather = ()=>{
  //   reqWeather();
  //   // console.log(result);
  // }
  componentDidMount(){
    //给screenfull绑定监听
   screenfull.on('change',()=>{
     let isFull = !this.state.isFull;
     this.setState({isFull})
   })
   this.timeID = setInterval(() => {
     this.setState({date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
   }, 1000);
  }
 componentWillUnmount(){
  clearInterval(this.timeID)
 }
  //切换全屏按钮的回调
  fullScreen = ()=>{
    screenfull.toggle();
  }
  logOut=()=>{
    let {deleteUser} = this.props;
      confirm({
        title:'确定退出？',
        content: "若退出需要重新登录",
        okText:'确认',
        cancelText:'取消',
        onOk(){
          deleteUser();
        }
      });
    
  }
  render(){
    let {isFull} = this.state;
    let {user} = this.props.userInfo;

    return(
    <header className="header">
      <div className="header-up">
        <Button size="small" onClick={this.fullScreen}>
        { isFull ? <FullscreenExitOutlined />:<FullscreenOutlined />}
        </Button>
        <span className="username">欢迎,{user.username}</span>
        <Button type="link" onClick={this.logOut}>退出登录</Button>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">
           {this.props.location.pathname}
        </div>
        <div className="header-bottom-right">
          {this.state.date}
          <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气信息"/>
          晴 &nbsp;&nbsp; 温度: 20 ~ 30

        </div>
        
      </div>
    </header>
    )
  }
}
export default Header