import React,{Component} from 'react'
import { creatIncrementAction,creatDecrementAction } from './redux/action_creators';

export default class Mycomponent extends Component{
  
componentDidMount(){
 console.log(this.props.store)
  }
  //加法
increment = ()=>{
  let {value} = this.refs.selectNumber;
  this.props.store.dispatch(creatIncrementAction(value*1))
}
//减法
decrement = ()=>{
  let {value} = this.refs.selectNumber;
  this.props.store.dispatch(creatDecrementAction(value*1))
}
//奇数加
incrementIfOdd = ()=>{
  let {value} = this.refs.selectNumber;
  let count = this.props.store.getState();
  if(count%2 === 1){
     this.props.store.dispatch(creatIncrementAction(value*1))
  }
}
//异步加
incrementAsync = ()=>{
  let {value} = this.refs.selectNumber;
  setTimeout(() => {
    this.props.store.dispatch(creatIncrementAction(value*1))
  }, 1000);
}
    render(){
      let count = this.props.store.getState();
      return(
      <div>
        <h3>当前计数为{count}</h3>
        <select ref="selectNumber">
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>

      </div>
      ) 
    }
}