//项目中所有请求由这个文件发出
import myAxios from './myAxios'
// import jsonp from 'jsonp'
// import {message} from 'antd'
//引入请求的基本路径
import {BASE_URL} from '../config/index.js'

//登录请求
export const reqLogin = (username,password)=>myAxios.post(`${BASE_URL}/login`,{username,password})
//获取商品列表请求
export const reqCatagoryList = ()=>myAxios.get(`${BASE_URL}/manage/category/list`)
//新增商品分类
export const reqAddCatagory = ({categoryName})=>myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})
//更新一个商品分类
export const reqUpdateCatagory = ({categoryId,categoryName})=>myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})
//请求商品分页列表
export const reqProductList = (pageNum,pageSize)=>myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})
//请求更新商品状态
export const reqUpdateProdStatus = (productId,status)=>myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})
//搜索商品
export const reqSearchProduct = (pageNum,pageSize,searchType,keyword)=>myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyword}})
//根据商品id获取商品信息
export const reqProdById = (productId)=> myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})
//请求删除图片（根据图片唯一名删除）
export const reqDeletePicture = (name)=>myAxios.post(`${BASE_URL}/manage/img/delete`,{name})
//请求添加商品
export const reqAddProduct = (productObj)=> myAxios.post(`${BASE_URL}/manage/product/add`,{...productObj})
//请求更新商品
export const reqUpdateProduct = (productObj)=> myAxios.post(`${BASE_URL}/manage/product/update`,{...productObj})
//请求所有角色列表
export const reqRoleList = ()=> myAxios.get(`${BASE_URL}/manage/role/list`)
//请求添加角色
export const reqAddRole = ({roleName})=> myAxios.post(`${BASE_URL}/manage/role/add`,{roleName})
//请求给角色授权export const reqAddRole = ({roleName})=> myAxios.post(`${BASE_URL}/manage/role/add`,{roleName})
export const reqAuthRole = (roleObj)=> myAxios.post(`${BASE_URL}/manage/role/update`,{...roleObj,auth_time:Date.now()})
//请求获取所有用户列表（同时携带着角色列表）
export const reqUserList = ()=> myAxios.get(`${BASE_URL}/manage/user/list`)
//请求添加用户
export const reqAddUser = (userObj)=> myAxios.post(`${BASE_URL}/manage/user/add`,{...userObj})



//获取天气信息（百度接口,使用jsonp的方式请求）
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

  




