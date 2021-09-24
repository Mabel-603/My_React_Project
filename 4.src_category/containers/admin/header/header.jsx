import React,{Component} from 'react'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import menuList from '../../../config/menu_config'
import {creteDeleteUserInfoAction} from '../../../redux/action_creators/login-action'
import './header.less'

const {confirm} = Modal;

@connect(
  state=>({
    userInfo:state.userInfo,
    title:state.title
  }),
  {deleteUser:creteDeleteUserInfoAction}
)
@withRouter
class Header extends Component{
  state={
    isFull:false,
    date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    title:''
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
   this.getTitle();
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
  getTitle = ()=>{
    let pathKey = this.props.location.pathname.split('/').reverse()[0]
    let title=''
    menuList.forEach((item)=>{
     if(item.children instanceof Array){
      let tmp =  item.children.find((citem)=>{
        return citem.key === pathKey
       })
      if(tmp) title=tmp.title;
     }else{
       if(item.key === pathKey) title = item.title;
     }
    })
    this.setState({title})
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
           {this.props.title || this.state.title}
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