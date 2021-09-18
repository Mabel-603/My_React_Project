import Counter from '../components/counter.jsx'
import {connect} from 'react-redux'
import {creatIncrementAction,creatDecrementAction} from '../redux/action_creators'
//完整写法
// function mapStateToProps(state){
//   return {count:state}
// }
// function mapDispatchToProps(dispatch){
//   return {
//    increment:(value)=>{dispatch(creatIncrementAction(value))},
//    decrement:(value)=>{dispatch(creatDecrementAction(value))}
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Counter)

//简化写法
// let mapStateToProps = state => ({count:state})
// let mapDispatchToProps = dispatch =>( {
//     increment:(value)=>{dispatch(creatIncrementAction(value))},
//     decrement:(value)=>{dispatch(creatDecrementAction(value))}
//   })
// export default connect(mapStateToProps,mapDispatchToProps)(Counter)

//进一步简化:
export default connect(
  state=>({count:state}),
  {increment:creatIncrementAction,
   decrement:creatDecrementAction 
  }
   )(Counter)


//按照之前的写法：
//如果connect函数的第二个参数传递的是：mapDispatchToProps
//那么UI组件接收到的increment是：(value)=>{dispatch(createIncrementAction(value))}
//那么UI组件接收到的decrement是：(value)=>{dispatch(createDecrementAction(value))}

//按照新的写法：
//如果connect函数的第二个参数传递的是：{increment:createIncrementAction}
//那么UI组件接收到的increment是：(value)=>{dispatch(createIncrementAction(value))}

//connect函数做了如下的事情(高阶函数)
/* function connect(createIncrementAction) {
  return (value)=>{dispatch(createIncrementAction(value))
} */
