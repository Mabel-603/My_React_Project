import React,{Component} from 'react'


export default class App extends Component{
componentDidMount(){
 console.log(this.props.count);
}

 increment =()=>{//为什么这里前面写function不对---->因为后面才是在定义箭头函数
  let {value} = this.refs.selectNumber;
  this.props.increment(value*1);
}
decrement =()=>{
  let {value} = this.refs.selectNumber;
  this.props.decrement(value*1);
}
IncrementIfOdd=()=>{
  let {count} = this.props;
  if(count%2 === 1){
    let {value} = this.refs.selectNumber;
    this.props.increment(value*1);
  }
}
IncrementAsync =()=>{
  let {value} = this.refs.selectNumber;
  this.props.incrementAsync(value*1);
// setTimeout(() => {
//   let {value} = this.refs.selectNumber;
//   this.props.increment(value*1);
// }, 1000);
}
    render(){
      let {count} = this.props;
      return(
      <div>
        <h1>当前计数为{count}</h1>
        <select ref="selectNumber">
         <option>1</option>
         <option>2</option>
         <option>3</option>
        </select>&nbsp;
        <button onClick ={this.increment} >+</button>&nbsp;
        <button onClick ={this.decrement}>-</button>&nbsp;
        <button onClick ={this.IncrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick ={this.IncrementAsync}>increment async</button>
      </div>
      )
    }
}