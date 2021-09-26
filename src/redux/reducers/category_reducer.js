import {SAVE_CATEGORY_LIST} from '../action_types'

let initialState = ''
export default function categoryList(preState=initialState,action){
let {type,data} = action;
let newState;
switch (type) {
  case SAVE_CATEGORY_LIST:
    newState = [...data];
    return newState;
  default: 
    return preState;
    
}
 }
