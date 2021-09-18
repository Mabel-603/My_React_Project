import React,{Component} from 'react'
import { Form, Input, Button, Checkbox,message} from 'antd'
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import {creteSaveUserInfoAction} from '../../redux/action_creators/login-action'
import {reqLogin} from '../../api/index.js'
import logo from './imgs/logo.jpg'
import "./css/login.less"

const {Item} = Form;

class Login extends Component{
componentDidMount(){
  console.log(this.props);
}
 onFinish = async (values) => {
  //values的值是:{username:XXX,password:yyy}
  // alert('向服务器发送登录请求')
  let {username,password} = values;
  //axios的post请求默认将参数转成json进而发给服务器,这里需要把参数转成urlencoded形式
  let result =await reqLogin(username,password)
  //从响应中获取：请求状态、错误信息、数据
  let{status,data,msg} = result;
  if(status === 0){
     //1.服务器返回的user信息，还有token交由redux管理
   this.props.saveUserInfo(data)
    //2.跳转admin页面
   this.props.history.replace('/admin')
  }else{
    message.warning(msg,1)//表示提示1s后消失
  }
};

 onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

  //密码验证器---每当在密码输入框输入东西后，都会调用此函数去验证输入是否合法。自定义校验，即：自己写判断
pwdValidator=(rule, value)=>{
    if(!value){
      return Promise.reject(new Error('密码必须输入!'))
    }else if(value.length < 4){
      return Promise.reject(new Error('密码必须大于等于4位'))
    }else if(value.length > 12){
      return Promise.reject(new Error('密码必须小于等于12位'))
    }else if(!(/^\w+$/).test(value)){
      return Promise.reject(new Error('密码必须是字母、数字或下划线组成'))
    }else{
      return Promise.resolve()
    }
  }
    render(){
     const {isLogin} = this.props;
     if(isLogin){
       return <Redirect to='/admin'/>
     }
      return(
      <div className="login">
        <header>
           <img src={logo} alt="logo" />
           <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form
      name="basic"
      labelCol={{span: 8,}}
      wrapperCol={{span: 16,}}
      initialValues={{remember: true}}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
      autoComplete="off">
          {/* 用户名/密码的的合法性要求
         1). 必须输入
         2). 必须大于等于4位
         3). 必须小于等于12位
         4). 必须是字母、数字或下划线组成
        */}
      <Item label="用户名" name="username" rules={[{required: true,message: '用户名必须输入!'},
      {max:12,message:'用户名必须小于等于12位'},
      {min:4,message:'用户名必须大于等于4位'},
      {pattern:/^\w+$/,message:'用户名必须是字母、数字或下划线组成'},

    ]}>
        <Input prefix={<UserOutlined style={{color:'rgba(0,0,0,.5)'}}/>}/> 
      </Item>

    <Item  label={'密'+'\xa0\xa0\xa0\xa0'+'码'} name="password" rules={[
        {validator:this.pwdValidator,required:true}
    ]}>
        <Input.Password prefix={<LockOutlined style={{color:'rgba(0,0,0,.5)'}}/>}/>
      </Item>

      <Item name="remember" valuePropName="checked" wrapperCol={{offset: 8,span: 16,}}>
        <Checkbox>记住我</Checkbox>
      </Item>

      <Item wrapperCol={{offset: 8,span: 16,}}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Item>
    </Form>

        </section>
      </div>
      )
    }
}

export default connect(
state=>({isLogin:state.userInfo.isLogin}),
{
  saveUserInfo:creteSaveUserInfoAction
}
)(Login)