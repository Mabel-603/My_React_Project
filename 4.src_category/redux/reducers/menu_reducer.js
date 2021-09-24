import {SAVE_TITLE} from '../action_types'

let initialState = ''
export default function menu(preState=initialState,action){
let {type,data} = action;
let newState;
switch (type) {
  case SAVE_TITLE:
    newState = data;
    return newState;
  default: 
    return preState;
    
}
 }
