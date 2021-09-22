//项目中所有请求由这个文件发出
import myAxios from './myAxios'
// import jsonp from 'jsonp'
// import {message} from 'antd'
import {BASE_URL} from '../config/index.js'


export const reqLogin = (username,password)=>myAxios.post(`${BASE_URL}/login`,{username,password})
export const reqCatagoryList = ()=>myAxios.get(`${BASE_URL}/manage/category/list`)

// export const reqWeather = ()=>{
//   return new Promise((resolve,reject)=>jsonp(`https://api.map.baidu.com/weather/v1/?district_id=${CITY_ID}&data_type=all&ak=${WEATHER_AK}`,
//   (err,data)=>{
//    if(err){
//      message.error('请求天气接口失败，请联系管理员')
//      return new Promise(()=>{})
//    }else{
//      console.log(data);
//      resolve(data)
//    }
//   }
//   )
//   )
// }

  




