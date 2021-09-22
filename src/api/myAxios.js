import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'querystring'
import  {message} from 'antd'
import 'nprogress/nprogress.css'
import store from '../redux/store'
import {creteDeleteUserInfoAction} from "../redux/action_creators/login-action.js"

const instance = axios.create({
  timeout : 4000,
})

//请求拦截器
instance.interceptors.request.use(function (config) {
  NProgress.start();
  //从redux中获取之前所保存的token
  let {token} = store.getState().userInfo;
  //向请求头中添加token,用于校验身份
  if(token) config.headers.Authorization = 'atguigu_'+token;

  //从配置对象中获取method和data
  let {method,data} = config;
  //若是post请求
  if(method.toLowerCase() === 'post'){
     //若传递过来的参数是对象，转换成urlencoded形式
    if(data instanceof Object){
     config.data = qs.stringify(data)
    }
  }
  return config;
})
//响应拦截器
instance.interceptors.response.use(
  (response)=>{
    NProgress.done();
    return response.data
  },
  (error)=>{
    NProgress.done();
    if(error.response.status === 401){
      message.error("身份校验失败",1)
      store.dispatch(creteDeleteUserInfoAction())
    }else{
      message.error(error.message,1)
    }
    return new Promise(()=>{})
  }
)



export default instance