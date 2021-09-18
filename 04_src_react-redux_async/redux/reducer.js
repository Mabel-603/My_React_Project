import {INCREMENT,DECREMENT} from  './action_types'
let initialState = 0;
export default function (preState=initialState,action){
  console.log('reducer 调用了-------',action);
  let newState;
  let {type,data} = action;
switch (type) {
    case INCREMENT:
    newState = preState + data;
    console.log(newState);
    return newState; 
    case DECREMENT:
    newState = preState - data;
    return newState;
    default:return preState;
}
}