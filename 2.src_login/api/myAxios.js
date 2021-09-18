import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'querystring'
import  {message} from 'antd'
import 'nprogress/nprogress.css'

const instance = axios.create({
  timeout : 4000,
})

//请求拦截器
instance.interceptors.request.use(function (config) {
  NProgress.start();
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

instance.interceptors.response.use(
  (response)=>{
    NProgress.done();
    return response.data
  },
  (error)=>{
    NProgress.done();
    message.error(error.message,1)
    return new Promise(()=>{})
  }
)



export default instance