
import {INCREMENT,DECREMENT} from '../action_types.js'
export default function Reducer(previousState=0,action){
  console.log('----reducer调用了----',action);
  let newState;
  let {type,data} = action;
switch (type) {
  case INCREMENT:
    newState = previousState + data;
    console.log(newState);
    return newState;
  case DECREMENT:
    newState = previousState - data;
    console.log(newState);
    return newState;
  default:return previousState;
}
}