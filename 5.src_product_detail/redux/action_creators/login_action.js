import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'


export const creteSaveUserInfoAction = value =>{
  localStorage.setItem('user',JSON.stringify(value.user))
  localStorage.setItem('token',value.token)
 return {type:SAVE_USER_INFO,data:value}}
 export const creteDeleteUserInfoAction = ()=>{
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {type:DELETE_USER_INFO}
 } 



